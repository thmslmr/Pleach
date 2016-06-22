Template.conversation.onRendered(function(){

    // Changement de la vue de l'utilisateur au rendu de la conversation
    Meteor.call('changeView', this.data._id, function(err){
        if(err){
            console.log(err);
        }
    });
    $('.discussion').scrollTop($('.discussion')[0].scrollHeight);
});

Template.conversation.helpers({

    // Retourne la liste des messages de la conversation
    'messages': function(){
        return this.public && this.public.messages;
    },
    'titleConv' : function(){
        lesson = this.private && Lessons.findOne(this.private.id_cours);
        return lesson ? lesson.public.title: 'Hodor';
    },
    // Retourne un boolean pour un message/notification d'avis
    'actionNotice': function(){
        if(this.action){
            return this.action.name == 'Notif';
        }
    },
    'isMine' : function(){
        return this.author == Meteor.userId() ? 'message--user' : '';
    }

});

Template.conversation.events({

    'submit .js-formMessage' : function(event){

        event.preventDefault();

        text = _.trim( $('.js-inputMessage').val() );

        Meteor.call('addMessage', text, this._id, function(err){
            if(err){
                console.log(err);
            }
            else{
                $('.js-inputMessage').val("");
                $('.discussion').scrollTop($('.discussion')[0].scrollHeight);
            }
        });
        return false;
    }

});

Template.conversation.onDestroyed(function(){

    // Changement de la vue de l'utilisateur quand il quitte la conversation
    Meteor.call('changeView', this.data._id, function(err){
        if(err){
            console.log(err);
        }
    });
});
