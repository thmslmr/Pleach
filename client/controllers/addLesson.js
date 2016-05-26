// Fonction exécutée au rendu du template addLesson
Template.addLesson.onRendered(function(){

  this.autorun(function(){
    if (GoogleMaps.loaded()) {
      $(".js-address").geocomplete().bind("geocode:result", function(evt, res){
        address_object = res
      });
    }
  })

});

// Gestion des evenements pour le template addLesson
Template.addLesson.events({

  'click .js-submit' : function(evt){
    var keys = [] , values = [];
    $('.js-address').trigger('geocode')

    LessonObject = {
        title : _.trim( $('input[name="title"]') ),
        description : _.trim( $('input[name="description"]') ),
        categorie : _.trim( $('input[name="categorie"]') ),
        level : parseInt( $('input[name="level"]') ),
        nbseats : parseInt( $('input[name="nbseats"]') ),
        date : moment( $('input[name="date"]') )._d,
        price : parseInt( $ ('input[name ="price"]') ),
        address : _.pick(address_object, ['formatted_address', 'geometry', 'place_id'])
    }

    LessonObject.address.geometry.location.lat = LessonObject.address.geometry.location.lat()
    LessonObject.address.geometry.location.lng = LessonObject.address.geometry.location.lng()

    // Appel de la méthode d'ajout d'un cours
    Meteor.call('addLesson', LessonObject, function(err){
        if(err){
            console.log(err)
        }else{
            Router.go('home')
        }
    });

  }

});

// Helpers pour le template addLesson
Template.addLesson.helpers({
  //
});
