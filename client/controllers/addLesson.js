Template.addLesson.events({
  'click .js-submit' : function(evt){

    var keys = [] , values = [];

    // Parcours des inputs pour récupérer les clés / valeurs
    $('.js-formNewLesson :input').each(function(){
      key = this.name;
      value = pretifyInput(this.type, $(this).val())

      keys.push(key);
      values.push(value);

    })

    //Création de l'objet lessons
    LessonObject = _.zipObjectDeep(keys, values)

    // Appel de la méthode d'ajout d'un cours
    Meteor.call('addLesson', LessonObject, function(err){
       if(err){
         console.log(err)
       }
    });

  }
})

Template.addLesson.helpers({
  //
})
