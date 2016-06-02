// Création de la collection Lessons
Lessons = new Mongo.Collection('lessons');

// l'ensemble des methodes pour la collection Lessons
Meteor.methods({

    // Methode pour ajouter un cours
    addLesson : function(LessonObject){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
            return null;
        }

        // Première Verification des données entrantes
        _.map(LessonObject, function(value, key){
            if(key == "timestart" || key == "duration"){
                LessonObject[key] = formatTime(value)
            }
        })

        // Verification du format
        check(LessonObject,
          {
            title : String,
            level : Number,
            price : Number,
            categorie : String,
            description : String,
            nbseats : Number,
            address : Object,
            date : Date,
            duration: String,
            timestart : String,
          }
        )

        // Insertion dans la BDD
        newlesson = Lessons.insert({
            public : LessonObject,
            private : {
                createdAt : new Date,
                owner : this.userId,
                complete : false,
                registered : [],
                notice : []
            }
        })

        // Retourne l'id du document ajouté à la collection
        return newlesson;
    },

    // Methode d'ajout d'un participant
    addParticipant : function(idLesson){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
            return null;
        }

        // Check des valeurs envoyées par le client
        check(idLesson, String)

        // Récupération du cours
        lesson  = Lessons.findOne(idLesson)

        // Si le cours existe et qu'il n'appartient pas à l'utilisateur courant
        if(lesson && lesson.private.owner != Meteor.userId() ){

            // S'il reste au moins un place
            if(lesson.private.registered.length < lesson.public.nbseats){

                /*
                    Update du cours :
                    - Ajout de l'id de l'utilisateur courant dans
                      la liste des inscrits s'il n'existe pas déjà - $addToSet
                */
                Lessons.update(idLesson, {
                    $addToSet : {
                        'private.registered' : Meteor.userId()
                    }
                })

                text = Meteor.user().profile.first_name + " s'est inscrits à : " + lesson.public.title;
                Meteor.call('addNotif', text, lesson.private.owner, null, function(err){
                    if(err){
                        throw err;
                    }
                })

            }
        }else{
            throw new Meteor.Error('This lesson does not exist');
            return null;
        }
    },

    // Method d'ajout d'un avis
    addNotice: function(idLesson, notice){
        lesson = Lessons.findOne(idLesson)

        if(!this.userId || lesson.private.registered.indexOf(this.userId) == -1 || lesson.private.owner == this.userId){
            throw new Meteor.Error('not-authorized');
            return null;
        }

        check(idLesson, String)
        check(notice, {
            'comment': String,
            'grade': Number
        })
        notice['user'] = this.userId;

        alreadyNoticed = _.filter( lesson.private.notice, _.matches( { 'user': this.userId } ) ).length > 0 ? true : false;

        if(alreadyNoticed){

            upLesson = Lessons.update({
                _id :  idLesson,
                'private.notice' :{
                    $elemMatch :{
                        'user' :  this.userId
                    }
                }
            },{
                $set :{
                    'private.notice.$.comment' : notice['comment'],
                    'private.notice.$.grade' : notice['grade']
                }
            })

        }else{
            upLesson = Lessons.update(idLesson, {
                $push: {
                    'private.notice': notice
                }
            })
        }

        return upLesson
    }

})
