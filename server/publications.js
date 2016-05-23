// Publications des données vers le client

Meteor.publish('lessons', function(){
  return Lessons.find();
})

Meteor.publish('avis', function(){
  return Avis.find();
})
