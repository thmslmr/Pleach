Template.profile.onCreated(function(){

})
Template.profile.helpers({
    // Retourne les cours de l'utilisateur
    'userLessons' : function(){
        return Lessons.find(
            {
                'private.owner' : this._id
            },{
                sort : { 'private.createdAt' : -1 },
                limit : 3
            }
        );
    },
});
