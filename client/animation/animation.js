Template.inbox.uihooks({
  '.messagerie__layout': {
        insert: function(node, next, tpl) {
            $(node).insertBefore(next);
            fromConv = Session.get('conv');
            if(fromConv){
                wrapper = $(node).children('.wrapper2-animation');
                wrapper.velocity('transition.slideLeftBigIn',{
                    duration: 500,
                    
                })
            }else{
                $(node).velocity('transition.slideLeftBigIn',{
                    duration: 500
                });
            }
        },

        remove: function(node, tpl) {
            conv2 = Router.current().url.indexOf('conversation') > -1 ? true : false
            if(!conv2){
                $(node).velocity('transition.slideLeftBigOut',{
                    duration: 500,
                    complete : function(){
                        $(node).remove();
                    }
                });
            }else{
                $(node).remove();
            }
        }
    },

});

// Template.inbox.uihooks({
//
//     '.message__layout *': {
//         insert: function(node, next, tp1){
//             conv = Router.current().url.indexOf('conversation') > -1 ? true : false
//             $(node).insertBefore(next);
//             if(conv){
//                 $(node).velocity('transition.slideLeftBigIn',{
//                     duration: 500
//                 });
//             }
//         },
//
//         remove:
//     }
// })

Template.conversation.uihooks({
    '.message__layout': {
        insert: function(node, next, tp1){
            $(node).insertBefore(next);
            wrapper = $(node).children('.wrapper-animation');
            wrapper.velocity('transition.slideLeftBigIn',{
                duration: 500
            });
        },

        remove: function(node, tp1){
            conv2 = Router.current().url.indexOf('inbox') > -1 ? true : false
            if(conv2){
                $(node).remove();
            }else{
                $(node).velocity('transition.slideLeftBigOut',{
                    duration: 500,
                    complete : function(){
                        $(node).remove();
                    }
                })
            }
        }
    }
})

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
