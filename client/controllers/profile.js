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

    'userBadge' : function(){
        nb = Lessons.find({'private.owner' : this._id}).count();
        console.log(nb);
        level = 1;

            if(nb>49){
                return 5;
            }else if (nb>19) {
                return 4;
            }else if (nb>4) {
                return 3;
            }else if (nb>0) {
                return 2;
            }else {
                return 1;
            }

        }

});
