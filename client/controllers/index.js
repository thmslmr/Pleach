// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){

    // chargement de google map
    GoogleMaps.load({
        'key' : Meteor.settings.public.googleMaps.key,
        'libraries' : 'places'
    });

    markers = {}

    GoogleMaps.ready('map', function(map) {

        Lessons.find().observe({
            added: function(document) {

                marker = new google.maps.Marker({
                    animation: google.maps.Animation.DROP,
                    position: new google.maps.LatLng(document.public.address.geometry.location.lat, document.public.address.geometry.location.lng),
                    map: map.instance,
                    id: document._id
                });

                markers[document._id] = marker;

                marker.addListener('click', function(){
                    Router.go('lessonPreview', {_id : document._id})
                })
            },
            changed: function(newDocument, oldDocument) {
                markers[newDocument._id].setPosition({ lat: newDocument.public.address.geometry.location.lat, lng: newDocument.public.address.geometry.location.lng });
            },
            removed: function(oldDocument) {
                // Remove the marker from the map
                markers[oldDocument._id].setMap(null);

                // Remove the reference to this marker instance
                delete markers[oldDocument._id];
            }
        });
    });

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
            };
        }
    }
})
