Template.lesson.onRendered(function(){
    //
});

Template.lesson.helpers({
    //
});

Template.lesson.events({
    //
    "click .js-messaging": function(){
      Meteor.call('addConv', this._id, function(err, result){
        if(err){
          console.log(err);
        }
        else{
          //la fonction go() prend en second paramètre les paramètres de la route
          console.log(newConversation);
          Router.go('conversation', {_id : newConversation})
        }
      })
    }
});
