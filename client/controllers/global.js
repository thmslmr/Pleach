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
    myEmail : function(){
        return Meteor.user() && Meteor.user().profile.email;
    },
    // random user
    userPicture : function(userId){
        if(userId == '0'){
          return 'img/hodor.gif';
        }
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.picture;
    },
    userName : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.name;
    },
    userFirstName : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.first_name;
    },
    userLink : function(userId){
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.link;
    },
    // util
    dateCalendar : function(date){
        return moment(date).calendar();
    },
    dateFromNow : function(date){
        return moment(date).fromNow();
    },
    lengthTab :  function(tab){
        return tab && tab.length;
    },
    pluralize : function(nb){
        return nb > 1 ? 's' :  '';
    },
    truncate : function(string, length){
        return _.truncate(string, {'length' : length});
    },
    'lineBreaker' : function(string){
        return string.replace(/\r?\n/g, '<br />');
    }
};

_.each(registerHelper, function(value, key){
  Template.registerHelper(key, value);
});
