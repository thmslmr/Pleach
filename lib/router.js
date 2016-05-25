// Switch underscore to lodash
_ = lodash;

// Configuration générale
Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'loading',
});

// Hook onBeforeAction général
Router.onBeforeAction(function (pause) {
    this.next();
},{
	except: [],
    only : []
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
        if(Meteor.userId() != this.params._id){
            this.redirect('register')
        }else{
            Meteor.subscribe('linkedLessons')
        }
        this.next()
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
