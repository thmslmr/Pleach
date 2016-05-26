/*
    Fonctions de publication des données vers le client.
    MongoBd -> MiniMongo
    Appel fait depuis le client grace à Meteor.subscribe('nom_de_la_publication')
*/

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
    return Meteor.users.find(userId, {fields : {'services' : 0} } )
})

Meteor.publish('lessons', function(){
    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Retourne l'ensemble des cours
    return Lessons.find({}, {fields : {'private' : 0} })
});

Meteor.publish('linkedLessons', function(){
    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Retourne l'ensemble des cours publiés par l'utilisateur actuel
    return Lessons.find({"private.owner" : this.userId})
})

Meteor.publish('notice', function(){
    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    //Retroune l'ensemble des avis.
    return Notices.find();
})
