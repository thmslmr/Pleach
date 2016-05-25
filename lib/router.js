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

Router.route('notice',
  {
    name: 'notice',
    template: 'notice',
    path: '/notice',
    onBeforeAction: function(){ //permet de nous envoyer sur la bonne page
      Meteor.subscribe('notice');
      this.next();
    }
  }
);
