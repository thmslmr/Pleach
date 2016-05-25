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
        return Lessons.find({},{sort : {'private.createdAt' : -1}});
    },

});
