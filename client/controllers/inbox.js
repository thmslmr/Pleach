Template.inbox.helpers({

    // Retourne toutes les conversations
    'conversations': function(){
        return Conversations.find();
    },

    // Retourne le titre du cours
    'titleLesson': function(){
        _id = this.private.id_cours
        return _id ? Lessons.findOne(_id).public.title : "Hodor"
    },

    // Retourne de l'objet utilisateur qui n'est pas l'utilisateur courant
    'speaker': function(){
        return _.find(this.public.views , function(el){
            return el.user != Meteor.userId()
        }).user
    },

    // Retourne le dernier message d'une conversation
    'lastMessage': function(){
        if(_.last(this.public.messages)){
            return _.last(this.public.messages).text
        }
    }

})
