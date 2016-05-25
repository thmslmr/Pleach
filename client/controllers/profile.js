// Fonction exécutée au rendu du template profile
Template.profile.onRendered(function(){
//
});

// Gestion des evenements pour le template addLesson
Template.profile.events({
//
});

// Helpers pour le template addLesson
Template.profile.helpers({
    'myLessons' : function(){
        return Lessons.find();
    }
});
