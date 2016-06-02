// Gestion des evenements pour le template addNotice
Template.addNotice.events({
    'click .js-submit' : function(evt){
        //Récupération de l'objet Avis
        NoticeObject = {
            comment : $('.js-com').val(),
            grade : parseInt( $('.js-note').val() )
        }

        // Appel de la méthode d'ajout d'un avis
        Meteor.call('addNotice', this.cible, NoticeObject, function(err){
            if(err){
                console.log(err)
            }
            else{
                $('.js-submit').text('OK!')
            }
        });
    }
})

// Helpers pour le template addNotice
Template.addNotice.helpers({

})
