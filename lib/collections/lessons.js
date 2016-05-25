// Création de la collection Lessons

Lessons = new Mongo.Collection('lessons');

// l'ensemble des methodes pour la collection Lessons

Meteor.methods({

  // Methode pour ajouter un cours
  addLesson : function(LessonObject){

    // Verification de la présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return null;
    }

    // Verification des données rentrées par le client
    check(LessonObject,
      {
        title : String,
        level : Number,
        price : Number,
        categorie : String,
        description : String,
        nbseats : Number,
        address : Object,
        date : Date
      }
    )

    // Insertion dans la BDD
    newlesson = Lessons.insert({
      public : LessonObject,
      private : {
        createdAt : new Date,
        owner : this.userId,
        complete : false,
        registred : []
      }
    })

    return newlesson;
  }

})
