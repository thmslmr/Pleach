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

Router.route('avis',
  {
    name: 'avis',
    template: 'avis',
    path: '/avis',
    onBeforeAction: function(){
      Meteor.subscribe('avis');
      this.next();
    }
  }
);
