// Helpers utilisables dans n'importe quel template

registerHelper = {
    // users
    isUser : function(userId){
        return Meteor.userId() == userId;
    },
    // current user
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
    // random user
    userPicture : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.picture;
    },
    userName : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.name;
    },
    userFirstName : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.first_name;
    },
    // util
    dateCalendar : function(date){
        return moment(date).calendar();
    },
    dateFromNow : function(date){
        return moment(date).frowNow();
    },
    lengthTab :  function(tab){
        return tab && tab.length;
    }
}

_.each(registerHelper, function(value, key){
  Template.registerHelper(key, value);
});
