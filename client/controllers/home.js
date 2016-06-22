Template.home.helpers({
    'search' : function(){
        return Session.get('search') ? 'landingpage--hide' : '';
    }
});
