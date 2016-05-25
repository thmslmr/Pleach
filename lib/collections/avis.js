// Création de la collection Avis

Avis = new Mongo.Collection('avis');

// l'ensemble des methodes pour la collection Avis

Meteor.methods({

  // Methode pour ajouter un Avis
  addAvis: function(NoticeObject){

    // Verification de la présence d'un utilisateur
    if(!this.userId){
      throw "access denied !";
      return false;
    }

  newNotice = Avis.insert({
    public : NoticeObject
    private : {
      createdAt : new Date,
      owner : this.userId,
    }
  })

    return newNotice;

  }
})
