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

Template.conversation.uihooks({
    '.message__layout': {
        insert: function(node, next, tp1){
            $(node).insertBefore(next);
            wrapper = $(node).children('.wrapper-animation');
            wrapper.velocity('transition.slideLeftBigIn',{
                duration: 500,
                display: 'flex'
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
                duration: 500,
                display : 'flex'
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

Template.register.uihooks({
    '.modal': {
        insert: function(node, next, tp1){
            wrapper = $(node).children('.modal__connexion');
            $(node).insertBefore(next);
            wrapper.velocity('transition.flipXIn',{
                duration: 500,
                stagger: 100
            })
        },

        remove: function(node, tp1){
                    $(node).remove();

        }
    }
})
