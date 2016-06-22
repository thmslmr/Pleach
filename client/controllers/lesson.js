Template.lesson.onRendered(function(){

    lessonLocation = this.data && this.data.public.address.loc.coordinates;

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers : true});

    // travel = ['WALKING','BICYCLING','DRIVING'];
    Session.set('travel', null );

    this.autorun(function(){
        directionsService.route({
            origin : new google.maps.LatLng(Session.get('userLatLng')[0], Session.get('userLatLng')[1]),
            destination : new google.maps.LatLng(lessonLocation[1], lessonLocation[0]),
            travelMode : google.maps.TravelMode.DRIVING,
        }, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                data = result.routes[0].legs[0];
                Session.set({
                    'travel' : [data.distance.text, data.duration.text]
                });
                directionsDisplay.setDirections(result);
                directionsDisplay.setMap(gmap);
            }
        });
    });

});

Template.lesson.helpers({
    // Retourne un boolean indiquant si l'utilisateur est inscrit au cours
    'isRegistered' : function(){
        return this.private && this.private.registered.indexOf( Meteor.userId() ) > -1;
    },
    'levelLesson' : function(level){
        l = ["débutant","amateur","expert"];
        return l[level - 1];
    },
    'breakAddress' : function(address){
        return address && address.replace(',','<br/>');
    },
    'travel' : function(){
        return Session.get('travel') && Session.get('travel')[0] + '<br/>' + Session.get('travel')[1] || "trajet indisponible";
    }
});

Template.lesson.events({
    'click .js-entry' : function(){
        Meteor.call('addParticipant', this._id, function(err){
            if(err){
                console.log(err);
            }
        });
    },
    'click .js-messaging': function(){
        Meteor.call('addConv', this._id, function(err, result){
            if(err){
                console.log(err);
            }
            else{
                Router.go('conversation', {_id : newConversation});
            }
        });
    }
});

Template.lesson.onDestroyed(function(){

    // Suppression du trajet sur la map
    directionsDisplay.setMap(null);
    // Recentrage sur l'utilisateur
    gmap.setCenter(userMarker.getPosition());

});
