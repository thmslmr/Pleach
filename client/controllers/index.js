// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){
    // Initialisation de Google Maps (tout ce passe ici pour la map, aller voir dans js/googlemap.js)
    initGoogleMaps()

    // Sessions
    Session.set({
        'userPosition' : null,
        'userRadius' : null,
    })

    // Geocompletion sur l'input d'adresse
    this.autorun(function(){
        if (GoogleMaps.loaded()) {
            $(".js-address").geocomplete().bind("geocode:result", function(evt, res){
                Session.set('userLatLng', [
                    res.geometry.location.lat(),
                    res.geometry.location.lng()
                ]);
            });
        }
    })

})

Template.index.events({
    'click .js-logout' : function(){
        Meteor.logout(function(err){
            if(err){
                console.log(err)
            }else{
                Router.go('home')
            }
        })
    },
    'click .js-myposition' : function(evt){
        // Si le navigateur fournis la géolocalisation ...
        if(navigator.geolocation){
            // Récupération de la position de l'utilisateur
            navigator.geolocation.getCurrentPosition(function(position){
                // Récupération de la latitude et de la longitude
                lat = position.coords.latitude;
                lng = position.coords.longitude

                // Stockage des données en session
                Session.set('userLatLng', [ lat , lng ] );

                // Création d'un geocoder pour le revert-geocoding (coordonnées -> adresse)
                geocoder = new google.maps.Geocoder

                // Revert géocoding depuis les coordonnées récupérées
                geocoder.geocode({'location': {lat : lat, lng: lng}}, function(results, status) {
                    // Si le géocoding marche
                    if (status === google.maps.GeocoderStatus.OK) {
                        // Vérification de la présence d'un résultat
                        if (results[1]) {
                            // Récupération de l'address puis affichage dans l'input + focus le prochain input
                            adr = results[1].formatted_address;
                            $('.js-address').val(adr);
                            $('.js-radius').focus();
                        } else {
                            console.log("impossible de trouver votre position")
                        }
                    } else {
                        console.log(status)
                    }
                });
            })
        }else{
            console.log('Le navigateur ne le permet pas')
        }
    },
    'click .js-searchLessons' : function(){
        // Récuperation de la latitude et longitude
        lat = Session.get('userLatLng')[0];
        lng = Session.get('userLatLng')[1];

        // Récupération du rayon de recherche (convertion en metre)
        radius = parseInt( $('.js-radius').val() ) * 1000;
        Session.set('userRadius', radius)

        // Récupération des cours selon la position et le rayon
        Meteor.subscribe('geoLessons', Session.get('userLatLng'), radius, {
            onReady : function(){
                // Récupération des infos utilisateur de chaque cours
                Lessons.find().forEach( function(el){
                    Meteor.subscribe('userInfo', el.private.owner)
                })
            }
        })

        // Création du marqueur pointant l'utilisateur
        userMarker = new google.maps.Marker({
            map: gmap,
            position: new google.maps.LatLng(lat, lng),
            icon : {
                url: '/userMarker.png',
                scaledSize: new google.maps.Size(10, 10),
            },
        });

        // Création du cercle
        circle = new google.maps.Circle({
            map: gmap,
            radius: radius,
            strokeWeight:0,
            fillColor:"#838ab6",
            fillOpacity: 0.3
        });
        circle.bindTo('center', userMarker, 'position');

        // Centrage de la map + zoom to fit
        gmap.setCenter(userMarker.getPosition())
    }
})

Template.index.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(48.8566140, 2.3522219),
                zoom: 10,
                styles: Meteor.settings.public.googleMaps.style,
                disableDefaultUI: true,
                zoomControl: true,
            };
        }
    }
})
