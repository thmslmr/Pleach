Template.lessonPreview.helpers({
    'widthBar' : function(){
        ratio = this.private && this.private.registered.length * 100 / this.public.nbseats;
        return ratio + '%';
    },
});
