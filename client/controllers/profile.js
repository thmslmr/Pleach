Template.profile.helpers({
    // Retourne les cours de l'utilisateur
    'userLessons' : function(){
        return Lessons.find(
            {
                'private.owner' : this._id
            },{
                sort : { 'private.createdAt' : -1 }
            }
        );
    },
    // Retourne les avis de l'utilisateur (liste, nombre, moyenne)
    'userNotices' : function(){
        notices = []
        lessons = Lessons.find(
            {
                'private.owner' : this._id
            }
        );

        lessons.forEach(function(el){
            notices.push(el.private.notice)
        })
        n = _.flattenDeep(notices)
        return {
            array : n,
            nb : n.length,
            average : _.meanBy( n , function(el) {
                return el.grade
            })
        }
    },
});
