Template.lessonPreview.onRendered(function(){
    grade = 4.6;

    max = parseInt($('.js-grade').attr('width'));
    ratio = grade * max / 5;
    $('.js-grade rect').css('width', ratio);

});
Template.lessonPreview.helpers({
    'widthBar' : function(){
        ratio = this.private && this.private.registered.length * 100 / this.public.nbseats;
        return ratio + '%';
    },
});
