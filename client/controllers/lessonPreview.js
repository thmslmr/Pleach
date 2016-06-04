Template.lessonPreview.events({
 //
});

Template.lessonPreview.helpers({
    //
});

Template.lessonPreview.onRendered(function(){
    $('.short-panel').velocity('transition.slideLeftBigIn')
})

Template.lessonPreview.uihooks({
    '.short-panel' : {
        insert : function(node, next){
            $(node).insertBefore(next)
        },
        remove : function(node, tpl){
            $(node).velocity('transition.slideLeftOut', {
                complete : function(){
                    $(this).remove()
                }
            })
        }
    }
})
