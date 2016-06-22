Template.inbox.uihooks({
  '.messagerie__layout': {
        insert: function(node, next, tpl) {
            $(node).insertBefore(next);
            $(node).velocity('transition.slideLeftBigIn',{
                duration: 500
            });
        },

        remove: function(node, tpl) {
            $(node).velocity('transition.slideLeftBigOut',{
                duration: 500,
                complete : function(){
                    $(node).remove();
                }
            });
        }
    }
});

Template.profile.uihooks({
    '.profil__layout': {
        insert: function(node, next, tp1) {
            $(node).insertBefore(next);
            $(node).velocity('transition.slideDownBigIn',{
                duration: 500
            });
        },

        remove: function(node, tp1){
            $(node).velocity('transition.slideUpBigOut',{
                duration: 500,
                complete : function(){
                    $(node).remove();
                }
            });
        }
    }

});

Template.addLesson.uihooks({
    '.creation__layout': {
        insert: function(node, next, tp1){
            $(node).insertBefore(next);
            $(node).velocity('transition.slideLeftBigIn',{
                duration: 500
            });
        },

        remove: function(node, tp1){
            $(node).velocity('transition.slideLeftBigOut',{
                duration: 500,
                complete: function(){
                    $(node).remove();
                }
            });
        }
    }
});

// Template.home.uihooks({
//     '.landing-page__layout': {
//         insert: function(node, next, tp1){
//             $(node).insertBefore(next);
//             if(!Session.get('search')){
//                 $(node).velocity('transition.expandIn',{
//                     duration: 100
//                 });
//             }
//         },
//
//         remove: function(node, tp1){
//             $(node).velocity('transition.slideLeftBigOut',{
//                 duration: 500,
//
//                 complete: function(){
//                     // console.log("complete");
//                     $(node).remove();
//                 }
//             });
//         }
//     }
// });

Template.lessonPreview.uihooks({
    '.recherche__layout': {
        insert: function(node, next, tp1){
            $(node).insertBefore(next);
            $(node).velocity('transition.slideLeftBigIn',{
                duration: 500
            });
        },

        remove: function(node, tp1){
            $(node).velocity('transition.slideLeftBigOut',{
                duration: 500,

                complete: function(){
                    $(node).remove();
                }
            })
        }
    }
})

Template.lesson.uihooks({
    '.atelier__layout': {
        insert: function(node, next, tp1){
            $(node).insertBefore(next);
            $(node).velocity('transition.slideLeftBigIn',{
                duration: 500
            });
        },

        remove: function(node, tp1){
            $(node).velocity('transition.slideLeftBigOut',{
                duration: 500,

                complete: function(){
                    $(node).remove();
                }
            })
        }
    }
})
