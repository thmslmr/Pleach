// Switch underscore to lodash
_ = lodash;

// Configuration générale des routes
Router.configure({
    layoutTemplate: 'index',
    loadingTemplate: 'loading',
    notFoundTemplate : 'notfound',
});

// Hook 'onBeforeAction' uniquement pour les tempates listés dans only : [...]

/*
    onBeforeAction : fonction exécutée à l'appel de la route avant le rendu du template.
    Sert en générale à faire des vérifications / redirections.
*/

Router.onBeforeAction( function()
    {
        if( ! Meteor.userId() ){
            this.redirect('register')
        }
        this.next();
    },{
        except : ['register', 'home', 'lessonPreview']
    }
);

Router.route('home',{
    name: 'home',
    template: 'home',
    path: '/',
});

Router.route('register',{
    name: 'register',
    template: 'register',
    path: '/register',
    onBeforeAction : function(){
        if( Meteor.userId() ){
            this.redirect('home')
        }
        this.next()
    }
 });

Router.route('profile',{
    name: 'profile',
    template: 'profile',
    path: '/profile/:_id',
    onBeforeAction : function(){
        if( ! Meteor.users.findOne(this.params._id) ){
            this.redirect('home')
        }
        this.next()
    },
    data : function(){
        return Meteor.users.findOne(this.params._id);
    }
});

Router.route('lessonPreview',{
    name : 'lessonPreview',
    template : 'lessonPreview',
    path : '/lessonPreview/:_id',
    onBeforeAction : function(){
        if( !Lessons.findOne(this.params._id) ){
            this.redirect('home')
        }
        this.next()
    },
    data : function(){
        return Lessons.findOne(this.params._id);
    }
})

Router.route('lesson',{
    name : 'lesson',
    template : 'lesson',
    path : '/lesson/:_id',
    onBeforeAction : function(){
        if( !Lessons.findOne(this.params._id) ){
            this.redirect('home')
        }
        this.next()
    },
    data : function(){
        return Lessons.findOne(this.params._id);
    }
})

Router.route('addLesson',{
    name: 'addLesson',
    template: 'addLesson',
    path: '/addLesson',
});

Router.route('inbox',{
    name: 'inbox',
    template: 'inbox',
    path: '/inbox',
})

Router.route('conversation',{
    name: 'conversation',
    template: 'conversation',
    path: '/inbox/conversation/:_id',
    onBeforeAction: function(){
        if( !Conversations.findOne(this.params._id) ){
            this.redirect('messaging')
        }
        this.next();
    },
    data : function(){
        return Conversations.findOne(this.params._id)
    }
})
