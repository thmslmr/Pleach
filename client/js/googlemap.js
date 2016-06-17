// Variable global pour l'objet GoogleMaps
gmap = null;
userMarker = null;
circle = null;

// Fonction d'initialisation de Google Maps (appelée dans le controller de index)
initGoogleMaps = function(){

        // Chargement de google map
        GoogleMaps.load({
            'key' : Meteor.settings.public.googleMaps.key,
            'libraries' : 'places'
        });

        // Initialisation de la map une fois chargée
        GoogleMaps.ready('map', function(map) {

            // Récupération de l'objet Google Maps
            gmap = map.instance;

            // Création du marqueur utilisateur
            userMarker = new google.maps.Marker({
                map: gmap,
                position: new google.maps.LatLng(48.8566140, 2.3522219),
                icon : {
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: "#838ab6",
                    fillOpacity: 0.8,
                    scale: 5,
                    strokeWeight: 0
                },
            });

            // Création du cercle utilisateur
            circle = new google.maps.Circle({
                map: gmap,
                radius: 0,
                strokeWeight: 2,
                strokeOpacity : 0.5,
                strokeColor : '#53e1dc',
                fillOpacity : 0
            });
            circle.bindTo('center', userMarker, 'position');

            // Liste associative pour stocker les marqueurs des cours {_id : marqueur}
            markers = {};

            // Création du cluster (système de grille permettant le regroupement de marqueur s'ils sont trop proches)
            cluster = map_createCluster(map, markers);

            // Détection des changements dans la Collection Lessons
            Lessons.find({
                // $and : [{
                //         'public.address.loc' :
                //         {
                //             $near: {
                //                 $geometry: {
                //                     type: "Point" ,
                //                     coordinates: [ latLng[1] , latLng[0] ]
                //                 },
                //                 $maxDistance : radius,
                //                 $minDistance : 0
                //             },
                //         }
                //     },{
                //         'private.owner' : { $ne : this.userId }
                //     },{
                //         'public.date' : {$gt : new Date() }
                //     }
                // ]
                }).observe({
                // Pour un ajout
                added: function(document) {
                    // Création d'un marqueur
                    marker = map_createLessonMarker(map, document._id, document.public.categorie, document.public.address.loc.coordinates);
                    // Ajout à la liste associative
                    markers[document._id] = marker;
                    // Ajout au cluster
                    cluster.addMarker(marker);
                },
                // Pour une changement
                // changed: function(newDocument, oldDocument) {
                //     // Modification de la position
                //     markers[newDocument._id].setPosition({ lat: newDocument.public.address.loc.coordinates[1], lng: newDocument.public.address.geometry.loc.coordinates[0] });
                // },
                // Pour une suppression
                removed: function(oldDocument) {
                    oldmarker = markers[oldDocument._id];
                    // Suppression du marqueur dans le cluster
                    cluster.removeMarker(oldmarker);
                    // Suppression du marqueur sur la map
                    oldmarker.setMap(null);
                    // Suppression du marqueur dasn la liste associative
                    delete markers[oldDocument._id];
                }
            });
        });
};

// Fonction de création du cluster
function map_createCluster(map, markers){
    // Option du cluster
    clusterOptions = {
        gridSize: 65,
        maxZoom: 12,
        styles : [
            {
                url: '/cluster.png',
                width: 30,
                height: 30,
                anchorText: ["-3px", "0px"],
                anchor: [200, 140],
                textColor: '#ffffff',
                textSize: "10px"
            }
        ]
    };
    // Création du cluster
    cluster = new MarkerClusterer(map.instance, _.values(markers), clusterOptions);

    return cluster;
}

// Fonction de création d'un marqueur (associé à un cours)
function map_createLessonMarker(map, idLesson, cat, location){
    // Option du marqueur
    markerOptions = {
        animation: google.maps.Animation.DROP,
        position: new google.maps.LatLng(location[1], location[0]),
        map: map.instance,
        icon : {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: Meteor.settings.public.util.categories[cat] || "#000",
            fillOpacity: 0.8,
            scale: 10,
            strokeWeight: 0
        },
        id: idLesson
    };

    // Création du marqueur
    marker = new google.maps.Marker(markerOptions);

    // Création d'un evenment click associé au marqueur (Preview du cours)
    marker.addListener('click', function(){
        Router.go('lessonPreview', {_id : idLesson} );
    });

    return marker;
}
