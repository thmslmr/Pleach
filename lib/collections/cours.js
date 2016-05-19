// Création de la collection Cours

Cours = new Mongo.Collection('cours');

// l'ensemble des methodes pour la collection Cours

Meteor.methods({

  addLesson : function(title, name, desc){
    newlesson = Cours.insert({
      title : title,
      name : name,
      desc : desc
    })
  }

})
