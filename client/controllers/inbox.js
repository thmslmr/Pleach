Template.inbox.onCreated(function(){

    Conversations.find().forEach(function(el){

        u = _.find(el.public.views, function(e) {
            return e.user != Meteor.userId();
        });

        Meteor.subscribe('userInfo', u.user);
    });
});
Template.inbox.helpers({

    // Retourne toutes les conversations
    'conversations': function(){
        return Conversations.find();
    },
    // Retourne le nombre de conversations
    'nbConversations' : function(){
        return Conversations.find().count();
    },
    'nbConvNotView' : function(){
        convNotView = Conversations.find({
            "public.views" : {
                $elemMatch : {
                    "view" : false,
                    "user" : Meteor.userId()
                }
            }
        });
        return convNotView ? convNotView.count() : false;
    },
    'isView' : function(){
        return this.public && _.find(this.public.views , function(el){
            return el.user == Meteor.userId();
        }).view;
    },
    // Retourne le titre du cours
    'titleLesson': function(){
        _id = this.private.id_cours;
        lesson = Lessons.findOne(_id);
        return lesson && _id ? lesson.public.title : "Hodor";
    },

    // Retourne de l'objet utilisateur qui n'est pas l'utilisateur courant
    'speaker': function(){
        return this.public && _.find(this.public.views , function(el){
            return el.user != Meteor.userId();
        }).user;
    },

    // Retourne le dernier message d'une conversation
    'lastMessage': function(){
        if(_.last(this.public.messages)){
            return _.last(this.public.messages).text;
        }
    }

});
