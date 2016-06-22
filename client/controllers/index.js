// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){
    if( Meteor.userId() )
    Meteor.subscribe('userData');

    // Initialisation de Google Maps (tout ce passe ici pour la map, aller voir dans js/googlemap.js)
    initGoogleMaps();

    Session.set({
        'userLatLng': ["",""],
        'search' : false
    });

    this.autorun(function(){

        if ( GoogleMaps.loaded() ) {

            // Geocompletion sur l'input d'adresse + action
            $(".js-address").geocomplete().bind("geocode:result", function(evt, res){

                lng = res.geometry.location.lng();
                lat = res.geometry.location.lat();

                // Position du markeur à l'adresse choisie
                userMarker.setPosition( new google.maps.LatLng(lat, lng) );

                // Centre le cercle sur le marqueur utilisateur
                gmap.setCenter(userMarker.getPosition());

                // Sessions
                Session.set({
                    'search': true,
                    'userLatLng': [lat,lng]
                });
            });
        }
    });
});

Template.index.events({
    'click .js-logout' : function(){
        Meteor.logout(function(err){
            if(err){
                console.log(err);
            }else{
                Session.set('search', false);
                Router.go('home');
            }
        });
    },
    'click .js-myposition' : function(evt){
        // Si le navigateur fournis la géolocalisation ...
        if(navigator.geolocation){
            // Récupération de la position de l'utilisateur
            navigator.geolocation.getCurrentPosition(function(position){
                // Récupération de la latitude et de la longitude
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                // Stockage des données en session
                Session.set({
                        'userLatLng': [ lat , lng ],
                        'search' : true
                });

                // Position du markeur à l'adresse choisie
                userMarker.setPosition( new google.maps.LatLng(lat, lng) );

                // Centre le cercle sur le marqueur utilisateur
                gmap.setCenter(userMarker.getPosition());

                // Création d'un geocoder pour le revert-geocoding (coordonnées -> adresse)
                geocoder = new google.maps.Geocoder;

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
                            console.log("impossible de trouver votre position");
                        }
                    } else {
                        console.log(status);
                    }
                });
            });
        }else{
            console.log('Le navigateur ne le permet pas');
        }
    },
    'click .js-searchLessons' : function(){

        // Vérifie que les champs ont été rentré
        if( !Session.get('userLatLng') || !$('.js-radius').val() )
        return null;


        // Récuperation de la latitude et longitude
        lat = Session.get('userLatLng')[0];
        lng = Session.get('userLatLng')[1];

        // Récupération du rayon de recherche (convertion en metre)
        radius = parseInt( $('.js-radius').val() ) * 1000;

        gmap.fitBounds(circle.getBounds());

        // Récupération des cours selon la position et le rayon
        Meteor.subscribe('geoLessons', Session.get('userLatLng'), radius, {
            onReady : function(){
                // Récupération des infos utilisateur de chaque cours
                Lessons.find().forEach( function(el){
                    Meteor.subscribe('userInfo', el.private.owner);
                });
            }
        });

        $('footer').addClass('in-search');
    },
    'keyup .js-radius' : function(evt){
        val = parseFloat( $('.js-radius').val() );

        if(!val){
            return null;
        }

        if( val > 20){
            $('.js-radius').val('20');
            val = 20;
        }
        circle.setRadius(val * 1000);

    },
    'keyup .js-address' : function(){
        if( !$('.js-address').val() ){
            Session.set('search' , false);
        }
    },
    'click .js-showForm': function(){
        $('footer').removeClass('in-search');
    },
    'click .map-container' : function(){
        $('footer').addClass('in-search');
    },
    'click .icon-menu' : function(){
        $('.menu, .icon-menu').toggleClass('menu--open');
    },
    'click .menu a' : function(){
        $('.menu, .icon-menu').removeClass('menu--open');
    }
});

Template.index.helpers({

    mapOptions: function() {
        if ( GoogleMaps.loaded() ) {
            return {
                center: new google.maps.LatLng(48.8566140, 2.3522219),
                zoom: 14,
                styles: Meteor.settings.public.googleMaps.style,
                disableDefaultUI: true,
                zoomControl: true,
            };
        }
    },

    notViewConv: function(){
        conv = Conversations.find(
            {
                'public.views' : {
                    $elemMatch : {
                        'user' : Meteor.userId(),
                        'view' : false
                    }
                }
            }
        ).count();

        return conv > 0 ? conv : '';
    }
});
