Template.messaging.onRendered(function(){

    Meteor.subscribe('conversation');
    Meteor.subscribe('user') //permet de récupèrer les données user

});

Template.messaging.helpers({

  'conversations': function(){
    return Conversations.find();
  },

//récupère le titre de la leçon
  'titleLesson': function(){
    _id = this.private.id_cours
    return _id ? Lessons.findOne(_id).public.title : "Hodor"
  },

//récupère l'idée user qui n'est pas le notre
  'speaker': function(){
    obj =  _.find(this.public.views , function(el){
      return el.user != Meteor.userId()
    })
    return obj ? obj.user : false;
  },

//permet d'afficher le dernier message en preview des conversations
  'lastMessage': function(){
    //retourne le dernier message du tableau message
    if(_.last(this.public.messages)){
      return _.last(this.public.messages).text
    }
  }

})
