Template.inbox.onRendered(function(){
    //
});

Template.inbox.helpers({

    // Renvoie toutes les conversations
    'conversations': function(){
        return Conversations.find();
    },

    // Renvoie le titre du cours
    'titleLesson': function(){
        _id = this.private.id_cours
        return _id ? Lessons.findOne(_id).public.title : "Hodor"
    },

    // Renvoie de l'objet utilisateur qui n'est pas l'utilisateur courant
    'speaker': function(){
        return _.find(this.public.views , function(el){
            return el.user != Meteor.userId()
        }).user
    },

    // Renvoie le dernier message d'une conversation
    'lastMessage': function(){
        if(_.last(this.public.messages)){
            return _.last(this.public.messages).text
        }
    }

})
