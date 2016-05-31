/*
    Fonctions de publication des données vers le client.
    MongoBd -> MiniMongo
    Appel fait depuis le client grace à Meteor.subscribe('nom_de_la_publication')
*/

// Publication des données utilisateur grace à son ID
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

// Publication de l'ensemble des cours
Meteor.publish('lessons', function(){

    // Retourne l'ensemble des cours
    return Lessons.find({}, {fields : {'private' : 0} })
});

// Publication des cours dans un espace géographique réduit
Meteor.publish('geoLessons', function(latLng, radius ){

    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Création d'un index sur le champs loc (coordonnées du cours)
    Lessons._ensureIndex({'public.address.loc':'2dsphere'});

    // Retroune les cours compris entre un point (coordonnée de l'utilisateur) et une distance maximal (rayon de recherche)
    return Lessons.find({'public.address.loc' :
        {
            $near: {
                $geometry: {
                    type: "Point" ,
                    coordinates: [ latLng[1] , latLng[0] ]
                },
                $maxDistance : radius,
                $minDistance : 0
            },
        }
    },{
        public : 1,
        private : 1
    })
})

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
