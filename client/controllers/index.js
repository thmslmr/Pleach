// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){

  // chargement de google map
  GoogleMaps.load({
    key: 'AIzaSyBk1noc5F_RFlUjycQkbwwD5cXxlL2bdSU',
    libraries: 'places'
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
