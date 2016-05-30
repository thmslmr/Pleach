// Création de la collection Lessons
Conversations = new Mongo.Collection('conversations');

// l'ensemble des methodes pour la collection Lessons
Meteor.methods({

  // Methode méthode qui va créer une conversation
  addConv: function(id_cours){

    // Verification de la présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return null;
    }
    //récupérer l'ID du user qui a fait le cours
    owner = Lessons.findOne(id_cours).private.owner;

    //création de la conversation
    newConversation = Conversations.insert({
      public : {
        views : [
          {
            user : owner,
            view : false
          },
          {
            user : this.userId,
            view : true
          }
        ],
        message : [],
      },
      private: {
        id_cours: id_cours,
        createdAt: new Date(),
      }
    });
    //le résultat d'une insertion est l'id du truc inséré
    return newConversation;
  }


})
