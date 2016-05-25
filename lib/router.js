// Switch underscore to lodash
_ = lodash;

// Configuration générale
Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'loading',
});

// Hook onBeforeAction général
Router.onBeforeAction(function (pause) {
    if(!Meteor.userId()){
        this.redirect('register')
    }
    this.next();
},{
    only : ['profile', 'addLesson']
});

Router.route('home',
  {
    name: 'home',
    template: 'home',
    path: '/'
  });

Router.route('register',
  {
    name: 'register',
    template: 'register',
    path: '/register'
  }
);

Router.route('profile',
  {
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
  }
);

Router.route('addLesson',
  {
    name: 'addLesson',
    template: 'addLesson',
    path: '/addLesson',
    onBeforeAction: function(){
      Meteor.subscribe('lessons');
      this.next();
    }
  }
);
