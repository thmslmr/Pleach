// Helpers utilisables dans n'importe quel template

registerHelper = {
    // users
    isUser : function(userId){
        return Meteor.userId() == userId;
    },
    myId : function(){
        return Meteor.userId();
    },
    userPicture : function(id){
        var userId = id || Meteor.userId();

        if(userId == '0'){
          return 'img/hodor.gif';
        }

        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.picture;
    },
    userName : function(id){
        var userId = id || Meteor.userId();
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.name;
    },
    userFirstName : function(id){
        var userId = id || Meteor.userId();
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.first_name;
    },
    userLink : function(id){
        var userId = id || Meteor.userId();
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.link;
    },
    userEmail : function(id){
        var userId = id || Meteor.userId();
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.email;
    },
    userNotices : function(id){
        var userId = id || Meteor.userId();

        notices = [];

        lessons = Lessons.find(
            {
                'private.owner' : userId
            }
        );

        lessons.forEach(function(el){
            notices.push(el.private.notices);
        });

        n = _.flattenDeep(notices);
        m =  _.meanBy( n , function(el) { return el.grade; });
        return {
            array : n,
            nb : n.length,
            percent : m * 100 / 5 || 100,
            average : m || '5'
        };
    },
    userService : function(id){
        var userId = id || Meteor.userId();
        return Meteor.users.findOne(userId) && Meteor.users.findOne(userId).profile.service == 'facebook';
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
