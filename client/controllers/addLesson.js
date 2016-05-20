Template.addLesson.events({
  'click .js-submit' : function(evt){

    LessonObject = {
      title : $('.js-title').val(),
      level : $('.js-level').val(),
      price : parseInt($('.js-price').val()),
      categorie : $('.js-categorie').val(),
      description : $('.js-desc').val(),
      nbseats : $('.js-nbseats').val(),
      address : {
        street : $('.js-street').val(),
        city : $('.js-city').val(),
        country : $('.js-country').val()
      },
      date : $('.js-date').val()
    }

    Meteor.call('addLesson', LessonObject, function(err){
       if(err){
         console.log(err.reason)
       }
    });

  }
})

Template.addLesson.helpers({
  //
})
