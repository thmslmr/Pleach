Meteor.publish('cours', function(){
  return Cours.find(); 
})
