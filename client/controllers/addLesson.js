Template.addLesson.events({
  'click .js-submit' : function(evt){
     title = $('.js-title').val();
     name = $('.js-name').val();
     desc = $('.js-desc').val();

     Meteor.call('addLesson', title, name , desc, function(err){
       if(err){
         console.log(err.reason)
       }
     });

  }
})

Template.addLesson.helpers({
  //
})
