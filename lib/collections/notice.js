// Création de la collection Avis

Notices = new Mongo.Collection('notice');

// l'ensemble des methodes pour la collection Notices

Meteor.methods({

    // Methode pour ajouter un Notices
    addNotice: function(NoticeObject){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw "access denied !";
            return false;
        }

        // Verification des données entrées par le client
        check(NoticeObject,
          {
            comment : String,
            grade : Number,
          }
        )

        // Insertion dans la BDD
        newNotice = Notices.insert({
            public : NoticeObject,
            private : {
            createdAt : new Date,
            owner : this.userId
            }
        })

        return newNotice;

    }
})
