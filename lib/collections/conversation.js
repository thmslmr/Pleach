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
        messages : [],
      },
      private: {
        id_cours: id_cours,
        createdAt: new Date(),
      }
    });
    //le résultat d'une insertion est l'id du truc inséré
    return newConversation;
  },

  addMessage: function(text, id_conv){

    if(!this.userId){
      throw "access denied !";
      return false;
    }

    check(text, String);
    check(id_conv, String);

    message = {
      author: this.userId,
      text: text,
      createdAt: new Date()
    };

    newMessage = Conversations.update(
      {
        _id : id_conv,
        'public.views' : {
            $elemMatch: { 'user':
              {
                $ne: this.userId
              }
            }
          }
      },{
        //ajoute un message à la collection
        $push : {
          'public.messages' : message
        },
        $set : {
          'public.views.$.view' : false
        }
      }
    )
    return newMessage;
  },

  changeView: function(id_conv){

    if(!this.userId){
      throw "access denied !";
      return false;
    }

//mets à jour l'attribut view dans la collection Conversations
    updateView = Conversations.update(
      {
        _id : id_conv,
        'public.views' : {
            //match sur le bon user
            $elemMatch: {
              'user': this.userId
            }
          }
      },
      {
        //change la valeur d'un champs
        $set : {
          'public.views.$.view' : true
        }
      }
    )
    return updateView;
  }
})
