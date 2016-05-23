// Publications des données vers le client

Meteor.publish('cours', function(){
  return Cours.find();
})
