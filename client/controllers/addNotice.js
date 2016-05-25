// Gestion des evenements pour le template addNotice
Template.addNotice.events({
    'click .js-submit' : function(evt){

        //Récupération de l'objet Avis
        NoticeObject = {
            comment : $('.js-com').val(),
            grade : parseInt( $('.js-note').val() )
        }

        // Appel de la méthode d'ajout d'un avis
        Meteor.call('addNotice', NoticeObject, function(err){
            if(err){
                console.log(err)
            }
            else{
                // pas d'erreur : reset les inputs
                $('.js-com').val("");
                $('.js-note').val("")
            }
        });
    }
})

// Helpers pour le template addNotice
Template.addNotice.helpers({
    'notices' : function(){
        return Notices.find();
    }
})
