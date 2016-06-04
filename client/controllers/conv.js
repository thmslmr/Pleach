Template.conversation.onCreated(function(){

    // Changement de la vue de l'utilisateur au rendu de la conversation
    Meteor.call('changeView', this.data._id, function(err){
        if(err){
            console.log(err)
        }
    })

});

Template.conversation.helpers({

    // Retourne la liste des messages de la conversation
    'messages': function(){
        return this.public && this.public.messages;
    },

    // Retourne un boolean pour un message/notification d'avis
    'actionNotice': function(){
        if(this.action){
            return this.action.name == 'Notif'
        }
    }

});

Template.conversation.events({

    // Ajout d'un message dans la conversation au Enter
    'keyup .js-message' : function(evt){
        if(evt.which != 13)
        return;

        text = _.trim( $('.js-message').val() );

        Meteor.call('addMessage', text, this._id, function(err){
            if(err){
                console.log(err)
            }
            else{
                $('.js-message').val("")
            }
        })

    }

})

Template.conversation.onDestroyed(function(){

    // Changement de la vue de l'utilisateur quand il quitte la conversation
    Meteor.call('changeView', this.data._id, function(err){
        if(err){
            console.log(err)
        }
    })

})
