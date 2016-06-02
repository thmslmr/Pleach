// Fonction exécutée au rendu du template profile
Template.profile.onRendered(function(){
    Session.set({
        'userId' : Router.current().params._id,
    })
});

// Gestion des evenements pour le template addLesson
Template.profile.events({
//
});

// Helpers pour le template addLesson
Template.profile.helpers({
    'userLessons' : function(){
        return Lessons.find({'private.owner' : Meteor.userId()},{sort : {'private.createdAt' : -1}});
    },
    'userNotices' : function(){
        lessons = Lessons.find({'private.owner' : Meteor.userId()});
        notices = []
        lessons.forEach(function(el){
            notices.push(el.private.notice)
        })

        return _.flattenDeep(notices)
    },
    'nbNotices' : function(){
        lessons = Lessons.find({'private.owner' : Meteor.userId()});
        notices = []
        lessons.forEach(function(el){
            notices.push(el.private.notice)
        })
        return _.flattenDeep(notices).length
    },
    'average' : function(){
        lessons = Lessons.find({'private.owner' : Meteor.userId()});
        notices = []
        lessons.forEach(function(el){
            notices.push(el.private.notice)
        })

        return _.meanBy( _.flattenDeep(notices), function(el) { return el.grade} );
    }
});
