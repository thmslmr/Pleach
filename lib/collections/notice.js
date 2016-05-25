// Création de la collection Avis

Notice = new Mongo.Collection('notice');

// l'ensemble des methodes pour la collection Avis

Meteor.methods({

  // Methode pour ajouter un Avis
  addNotice: function(NoticeObject){

    // Verification de la présence d'un utilisateur
    if(!this.userId){
      throw "access denied !";
      return false;
    }

  newNotice = Notice.insert({
    public : NoticeObject,
    private : {
      createdAt : new Date,
      owner : this.userId
    }
  })

    return newNotice;

  }
})
