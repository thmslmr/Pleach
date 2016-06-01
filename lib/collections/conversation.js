// Création de la collection Conversations
Conversations = new Mongo.Collection('conversations');

// l'ensemble des methodes pour la collection Conversations
Meteor.methods({

    // Methode méthode de création d'une conversation
    addConv: function(id_cours){

    // Verification de la présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return null;
    }
    lesson = Lessons.findOne(id_cours)

    //récupérer l'ID du user qui a fait le cours
    owner = lesson.private.owner;

    //var qui contient la vérification de l'existance d'une conv avec déja les 2 mêmes interlocateur
    already = Conversations.find({
      $and : [{
        'public.views.user' : Meteor.userId()
      },
      {
        'public.views.user' : owner
      }]
    })

    if (already.count() < 1){
        throw new Meteor.Error('Vous discutez déjà ensemble')
        return null;
    }

    if(owner == this.userId || lesson.private.registered.indexOf(this.userId) > -1){
      throw new Meteor.Error('Vous êtes schizo')
      return null
    }

        // Création de la conversation
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

        //Retourne le résultat d'une insertion (id du document inséré)
        return newConversation;
    },

    // Methode méthode d'ajout d'un message dans une conversation
    addMessage: function(text, id_conv){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw "access denied !";
            return false;
        }

        // Check des valeurs envoyées par le client
        check(text, String);
        check(id_conv, String);

        // Création d'un objet message
        message = {
            author: this.userId,
            text: text,
            createdAt: new Date()
        };

        /*
            Update de la conversation :
            - Ajout du message dans l'attribut 'messages' (liste) - $push
            - Modification de la vue de l'autre user à false - $set
        */
        newMessage = Conversations.update(
            {
                _id : id_conv,
                'public.views' : {
                    $elemMatch: {
                        'user':{ $ne : this.userId }
                    }
                }
            },{
                $push : {
                    'public.messages' : message
                },
                $set : {
                    'public.views.$.view' : false
                }
            })
        },

    changeView : function(id_conv){

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
        },{
            //change la valeur d'un champs
            $set : {
                'public.views.$.view' : true
            }
        })

        return updateView;
    }
})
