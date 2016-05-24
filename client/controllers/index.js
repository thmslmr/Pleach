// Fonction exécutée au rendu du template index
Template.index.onRendered(function(){

  // chargement de google map
  GoogleMaps.load({
    key: 'AIzaSyBk1noc5F_RFlUjycQkbwwD5cXxlL2bdSU',
    libraries: 'places'
  });

})
