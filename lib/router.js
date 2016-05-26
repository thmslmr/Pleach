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

Router.onBeforeAction(function (pause) {
    if(!Meteor.userId()){
        this.redirect('register')
    }
    this.next();
},{
    except : ['home', 'register']
});

Router.route('home',{
    name: 'home',
    template: 'home',
    path: '/'
});

Router.route('register',{
    name: 'register',
    template: 'register',
    path: '/register',
    onBeforeAction : function(){
        if(Meteor.userId()){
            this.redirect('home')
        }
    }
 });

Router.route('profile',{
    name: 'profile',
    template: 'profile',
    path: '/profile/:_id',
    onBeforeAction : function(){
        Meteor.subscribe('userInfo', this.params._id)
        Meteor.subscribe('linkedLessons')
        this.next()
    },
    data : function(){
        return Meteor.users.findOne(this.params._id);
    }
});

Router.route('addLesson',{
    name: 'addLesson',
    template: 'addLesson',
    path: '/addLesson',
    onBeforeAction: function(){
      Meteor.subscribe('lessons');
      this.next();
    }
});

Router.route('addNotice',{
    name: 'addNotice',
    template: 'addNotice',
    path: '/addnotice',
    onBeforeAction: function(){
        Meteor.subscribe('notice');
        this.next();
    }
});
