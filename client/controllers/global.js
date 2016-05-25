// Helpers utilisables dans n'importe quel template

registerHelper = {
    myId : function(){
        return Meteor.userId();
    },
    myPic : function(){
        return Meteor.user() && Meteor.user().profile.picture;
    },
    myName : function(){
        return Meteor.user() && Meteor.user().profile.name;
    },
    myFirstName : function(){
        return Meteor.user() && Meteor.user().profile.first_name;
    },
    userPicture : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.picture;
    },
    userName : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.name;
    },
    userFirstName : function(){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.first_name;
    }
}

_.each(registerHelper, function(value, key){
  Template.registerHelper(key, value);
});
