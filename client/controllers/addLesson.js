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

    // Parcours des inputs pour récupérer les clés / valeurs après traitement
    $('.js-newLesson :input').each(function(){
      type = $(this).attr('class').replace('js-','');
      input = $(this).val();

      key = _.trim( _.toLower(this.name) );

      switch (type) {
        case 'text':
          value = _.trim( input );
          break;
        case 'int':
          value = parseInt( input );
          break;
        case 'date' :
          value = moment( input )._d;
          break;
        case 'address':
          value = address_object;
          break;
      }

      keys.push(key);
      values.push(value);
    })

    //Création de l'objet lessons
    LessonObject = _.zipObjectDeep(keys, values)
    LessonObject['address'] = _.pick(address_object, ['formatted_address', 'geometry', 'place_id']);

    // Appel de la méthode d'ajout d'un cours
    Meteor.call('addLesson', LessonObject, function(err){
       if(err){
         console.log(err)
       }
    });

  }

});

// Helpers pour le template addLesson
Template.addLesson.helpers({
  //
});
