step_nb = 1;

// Fonction exécutée au rendu du template addLesson
Template.addLesson.onRendered(function(){

    this.autorun(function(){
        if (GoogleMaps.loaded()) {
            $(".js-address").geocomplete().bind("geocode:result", function(evt, res){
                address_object = res;
            });
        }
    });

});

// Gestion des evenements pour le template addLesson
Template.addLesson.events({

    'click .js-submit' : function(evt){

        $('.js-address').trigger('geocode');

        LessonObject = {
            title : _.trim( $('[data-newLesson = "title"]').val() ),
            description : _.trim( $('[data-newLesson = "description"]').val().replace(/\r?\n/g, '<br />') ),
            categorie : _.trim( $('[data-newLesson = "categorie"]').val() ),
            level : parseInt( $('[data-newLesson = "level"]').val() ),
            nbseats : parseInt( $('[data-newLesson = "nbseats"]').val() ),
            date : moment( $('[data-newLesson = "date"]').val() ),
            price : parseInt( $('[data-newLesson   ="price"]').val() ),
            duration : _.trim( $('[data-newLesson = "duration"]').val() ),
        };

        timestart = _.trim( $('[data-newLesson = "timestart"]').val() ).split('h');

        LessonObject.date = LessonObject.date.add({ h : timestart[0], m : timestart[1] })._d;

        LessonObject.address = {
            name : address_object.formatted_address,
            loc : {
                type : "Point",
                coordinates : [ address_object.geometry.location.lng() , address_object.geometry.location.lat() ]
            }
        };

        // Appel de la méthode d'ajout d'un cours
        Meteor.call('addLesson', LessonObject, function(err){
            if(err){
                console.log(err);
            }else{
                Router.go('home');
            }
        });

    },

    'click .js-next' : function(evt){
        if(step_nb == 3)
        return;

        step_nb += 1;

        dist = parseInt($('.step-content:nth-child(' + step_nb + ')').offset().left) - 50;
        $('.all-container').velocity({'translateX' : '-=' + dist}, {'easing' : 'ease-out'});
        $('.step:nth-child(' + step_nb + ')').addClass('step--done');
        if(step_nb == 3){
            $('.end-form a').addClass('js-submit').removeClass('js-next').text("C'est parti !");
        }
    },
    'keyup .js-hour' : function(evt){
        val = $(evt.target).val();

        if( val.length == 5){
            evt.preventDefault();
        }else if (val.length == 2 && val.indexOf('h') == -1 && evt.which != 8){
            $(evt.target).val(val + 'h');
        }
    },
    'blur .js-hour' : function(evt){
        if(!$(evt.target).val())
        return;

        val = $(evt.target).val().split('h');

        hVal = _.padStart(val[0], 2, '0');
        mVal = _.padEnd(val[1], 2, '0');

        $(evt.target).val(hVal + 'h' + mVal);
    },
    'keydown textarea' : function(evt){
        old_val = 500 - $(evt.target).val().length;

        if(evt.which == 8){
            if(old_val >= 500){
                evt.preventDefault();
                return;
            }else{
                new_val = old_val + 1;
            }
        }else{
            if( old_val <= 0){
                evt.preventDefault();
                return;
            }else{
                new_val = old_val - 1;
            }
        }

        $('.js-textareaInfo').text(new_val);
    }
});

// Helpers pour le template addLesson
Template.addLesson.helpers({
    'mindate' : function(){
        return moment().format("YYYY-MM-DD");
    },
    'maxdate' : function(){
        return moment().add('1','years').format('YYYY-MM-DD');
    }
});
