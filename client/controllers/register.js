Template.register.events({
    'click .js-facebook' : function(evt){
        Meteor.loginWithFacebook({loginStyle : 'redirect'}, function(err){
            if(err){
                console.log(err.reason)
            }
        });
    },
    'click .js-google' : function(evt){
        Meteor.loginWithGoogle({loginStyle : 'redirect'}, function(err){
            if(err){
                console.log(err.reason)
            }
        });
    }
})
