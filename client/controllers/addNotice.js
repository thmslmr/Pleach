Template.notice.events({
  'click .js-submit' : function(evt){

    //Récupération de l'objet Avis
    NoticeObject = {
      description : $('.js-com').val(),
      note : $('.js-note').val()
    }

  // Appel de la méthode d'ajout d'un avis
  Meteor.call('addNotice', NoticeObject, function(err){
    if(err){
         console.log(err)
    }
    else{
          $('.js-com').val("");
          $('.js-note').val("")
    }
  });
  }
})

// Helpers pour le template avis
Template.notice.helpers({
    'displayNotice' : function(){
      return Notice.find();
    },
    'formatDate' : function(){
      date = this.private.createdAt;
      return moment(date).calendar();
    },
    'userName' : function(){
      return Meteor.user && Meteor.user().profile.name;
    }
})
