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
