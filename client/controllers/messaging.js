Template.messaging.onRendered(function(){

    Meteor.subscribe('conversation');
    Meteor.subscribe('user')

});

Template.messaging.helpers({

  'conversations': function(){
    return Conversations.find();
  },

  'titleLesson': function(){
    _id = this.private.id_cours
    return Lessons.findOne(_id).public.title
  },

  'speaker': function(){
    views = this.public.views
    return _.find(views, function(el){
      return el.user != Meteor.userId()
    }).user
  },

  'lastMessage': function(){
    return _.last(this.public.messages).text
  }

})
