// Gestion des evenements pour le template addNotice
Template.addNotice.events({

    'click .js-submit' : function(evt){
        com = _.trim( $('.js-com').val() );
        grade = parseInt( $('.js-grade').val() );

        if(!com || !grade)
        return null

        //Récupération de l'objet Avis
        noticeObject = {
            comment : com,
            grade :  grade
        }

        // Appel de la méthode d'ajout d'un avis
        Meteor.call('addNotice', this.target, noticeObject, function(err){
            if(err){
                console.log(err)
            }
            else{
                $('.js-submit').text('OK!')
            }
        });
    }
})
