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
    return Lessons.findOne(_id).public.title
  },

//récupère l'idée user qui n'est pas le notre
  'speaker': function(){
    views = this.public.views
    return _.find(views, function(el){
      return el.user != Meteor.userId()
    }).user
  },

//permet d'afficher le dernier message en preview des conversations
  'lastMessage': function(){
    //retourne le dernier message du tableau message
    return _.last(this.public.messages).text
  }

})
