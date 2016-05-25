// Publications des données vers le client
Meteor.publish('lessons', function(){
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }else{
        return Lessons.find()
    }
});

Meteor.publish('linkedLessons', function(){
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }else{
        return Lessons.find({"private.owner" : this.userId})
    }
})

Meteor.publish('userInfo', function(userId){
    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Verification de l'existence de l'utilisateur recherché
    user = Meteor.users.find(userId);
    if(!user){
        return this.ready();
    }
    
    // Retourne l'utilisateur sans informations services (privées)
    return Meteor.users.find(userId, {fields : {'services' : 0}})
})

Meteor.publish('avis', function(){
  return Avis.find();
})