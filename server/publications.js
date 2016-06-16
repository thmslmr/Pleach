/*
    Fonctions de publication des données vers le client.
    MongoBd -> MiniMongo
    Appel fait depuis le client grace à Meteor.subscribe('nom_de_la_publication')
*/

/*
    Publication de l'ensemble des données relatives à l'utilisateur courant:
    - L'ensemble de son profil
    - L'ensemble des conversations dans lequel il apparaît
    - L'ensemble des cours auquel il est inscrit
    - L'ensemble des cours qu'il a créé
*/
Meteor.publish('userData', function(){

    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Profil
    profileData = Meteor.users.find(
        this.userId,
        {
            fields : { profile : 1}
        }
    );

    // Conversations
    convData = Conversations.find(
        {
            'public.views.user' : this.userId
        }
    );

    // Cours
    lessonData = Lessons.find(
        {
            $or : [
                {
                    'private.registered' : {
                        $all : [ this.userId ]
                    }
                },{
                    'private.owner' : this.userId
                }
            ]
        }
    );

    // Retourne une liste de curseur
    return [ profileData , convData, lessonData ];
});

//Publication des données d'un utilisateur selon son ID
Meteor.publish('userInfo', function(userId){

    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Verification de l'existence de l'utilisateur recherché
    if( !Meteor.users.find(userId) ){
        throw new Meteor.Error('This user does not exist');
        return this.ready();
    }

    // Retourne l'utilisateur sans informations services (privées)
    profileDate = Meteor.users.find(
        userId,
        {
            fields : { 'profile' : 1 }
        }
    );

    lessonData = Lessons.find({
        'private.owner' : userId
    },{
        'public' : 1,
        'private.notices' : 1,

    });

});

/*
    Publication des cours après recherche :
    - Distant de l'utilisateur selon un rayon donné
    - N'appartient pas l'utilisateur courant
    - N'est pas terminé
*/
Meteor.publish('geoLessons', function(latLng, radius ){

    // Verification présence d'un utilisateur
    if(!this.userId){
        throw new Meteor.Error('not-authorized');
        return this.ready();
    }

    // Verification de la valeur de radius
    if(radius > 20000 && radius < 0){
        throw new Meteor.Error('Not allowed radius value');
        return this.ready();
    }

    // Création d'un index sur le champs loc (coordonnées du cours)
    Lessons._ensureIndex({'public.address.loc':'2dsphere'});

    // Retroune les cours compris entre un point (coordonnée de l'utilisateur) et une distance maximal (rayon de recherche)
    return Lessons.find({
        $and : [{
                'public.address.loc' :
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
                'private.owner' : { $ne : this.userId }
            },{
                'public.date' : {$gt : new Date() }
            }
        ]
        },{
            public : 1,
            private : 1
        });
});
