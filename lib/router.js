Router.configure({
  layoutTemplate: 'index',
  loadingTemplate: 'loading',
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

Router.route('addAvis',
  {
    name: 'addAvis',
    template: 'addAvis',
    path: '/addAvis',
    onBeforeAction: function(){
      Meteor.subscribe('avis');
      this.next();
    }
  }
);
