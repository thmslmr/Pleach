// Création de la collection Conversations
Conversations = new Mongo.Collection('conversations');

// l'ensemble des methodes pour la collection Conversations
Meteor.methods({

    // Methode méthode de création d'une conversation
    addConv: function(coursId){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
            return null;
        }

        // Check des valeurs envoyées par le client
        check(convId, String);

        // Récupération du cours
        lesson = Lessons.findOne(coursId)

        // Vérification de l'existance du cours
        if( !lesson ){
            throw new Meteor.Error('Lesson doest not exist')
            return null;
        }

        // Récupération de l'ID de l'utilisateur qui a fait le cours
        owner = lesson.private.owner;

        // Vérification de la non-existance d'une conv entre les deux interlocateurs
        commonConv= Conversations.find({
          $and : [{
            'public.views.user' : Meteor.userId()
          },
          {
            'public.views.user' : owner
          }]
        })

        if (commonConv.count() < 1){
            throw new Meteor.Error('Vous discutez déjà ensemble')
            return null;
        }

        // Verification que l'utilisateur est inscrit au cours et n'est pas le créateur du cours
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
                id_cours: coursId,
                createdAt: new Date(),
                notification: false
            }
        });

        //Retourne le résultat d'une insertion (id du document inséré)
        return newConversation;
    },

    // Methode méthode d'ajout d'un message dans une conversation
    addMessage: function(text, convId){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw "Access denied !";
            return false;
        }

        // Check des valeurs envoyées par le client
        check(text, String);
        check(convId, String);

        // Vérification de l'existance de la conversation
        conv = Conversations.findOne(convId)
        if( !conv ){
            throw new Meteor.Error('This conversation does not exist');
            return null;
        }

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
                _id : convId,
                'public.views' : {
                    $elemMatch: {
                        'user':{ $ne : this.userId }
                    }
                }
            },
            {
                $push : {
                    'public.messages' : message
                },
                $set : {
                    'public.views.$.view' : false
                }
            })
        },

    changeView : function(convId){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw "Access denied !";
            return false;
        }

        // Check de l'id envoyé par le client
        check(convId, String);

        // Vérification de l'existance de la conversation
        conv = Conversations.findOne(convId)
        if( !conv ){
            throw new Meteor.Error('This conversation does not exist');
            return null;
        }

        // Mise à jour de l'attribut de la vue de l'utilisateur courant dans la conversation
        updateView = Conversations.update(
            {
                _id : convId,
                'public.views' : {
                    $elemMatch: {
                        'user': this.userId
                    }
                }
            },{
                $set : {
                    'public.views.$.view' : true
                }
            }
        )

        return updateView;
    },

    addNotif : function(text, userId, action){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw "Access denied !";
            return false;
        }

        // Check des valeurs
        check(text, String);
        check(userId, String);

        // Vérification de l'existance de l'utilisateur
        user = Meteor.users.findOne(userId)

        if( !user ){
            throw new Meteor.Error('This user does not exist');
            return null;
        }

        // Création de l'objet notification (message)
        notif = {
            author: '0',
            text: text,
            action: action,
            createdAt: new Date()
        }

        // Ajout de la notification message dans la conversation de notification de l'utilisateur
        Conversations.update(
            {
                $and:[
                    {
                        'public.views.user': userId
                    },{
                        'private.notification': true
                    }
                ]
            },{
                $push:{
                    'public.messages': notif
                },
                $set : {
                    'public.views.$.view' : false
                }
            }
        )
    }
})
