Template.avis.events({
  'click .js-submit' : function(evt){

    //Récupération de l'objet Avis
    NoticeObject = {
      description : $('.js-com').val(),
      note : $('js-note').val()
    }

  // Appel de la méthode d'ajout d'un avis
  Meteor.call('addAvis', NoticeObject, function(err){
    if(err){
         console.log(err)
    }
  });
  }
})
