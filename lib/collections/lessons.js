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
            registered : []
          }
        })
        return newlesson;
    },

    // Methode d'ajout d'un participant
    addParticipant : function(idLesson){

        // Verification de la présence d'un utilisateur
        if(!this.userId){
            throw new Meteor.Error('not-authorized');
            return null;
        }

        lesson  = Lessons.findOne(idLesson)

        if(lesson && lesson.private.owner != Meteor.userId() ){

            Lessons.update(idLesson, {
                $addToSet : {
                    'private.registered' : Meteor.userId()
                }
            })

        }else{
            throw new Meteor.Error('This lesson does not exist');
            return null;
        }
    }

})
