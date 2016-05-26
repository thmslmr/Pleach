// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){

  // chargement de google map
  GoogleMaps.load({
      'key' : Meteor.settings.public.googleMaps.key,
      'libraries' : 'places'
  });

})

Template.index.events({
    'click .js-logout' : function(){
        Meteor.logout(function(err){
            if(err){
                console.log(err)
            }else{
                Router.go('home')
            }
        })
    }
})
