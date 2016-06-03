Template.conversation.onRendered(function(){

    Meteor.subscribe('conversation');
    Meteor.call('changeView', this.data._id, function(err){
      if(err){
        console.log(err)
      }
    })

});

Template.conversation.helpers({

  //affiche le message qqui vient juste d'être envoyé
  'messages': function(){
    return this.public && this.public.messages;
  },
  'isView': function(){
      match =this.public && _.filter(this.public.views, _.matches({
        'user': Meteor.userId()
      }))
    return this.public && match[0].view ? "vue" : "pas vue";
    },

    'actionNotice': function(){
        if(this.action){
            return this.action.name == 'Notif'
        }
    }
});

Template.conversation.events({

  //ajoute un message quand appuie sur enter
  'keyup .js-message' : function(evt){
    if(evt.which == 13){
      text = $('.js-message').val()
      id_conv = this._id
      Meteor.call('addMessage', text, id_conv, function(err){
        if(err){
          console.log(err)
        }
        else{
          $('.js-message').val("")
        }
      })
    }

  }
})

Template.conversation.onDestroyed(function(){

  //appel de méthode
  Meteor.call('changeView', this.data._id, function(err){
    if(err){
      console.log(err)
    }
  })
})
