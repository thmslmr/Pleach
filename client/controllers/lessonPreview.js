Template.lessonPreview.onRendered(function(){
    //
});

Template.lessonPreview.events({
    //
});

Template.lessonPreview.helpers({
    //
});

Template.lessonPreview.uihooks({
    this : {
        insert: function(node, next, tpl) {
            console.log('Inserting an item.');
            $(node).insertBefore(next);
        },
        move: function(node, next, tpl) {
            console.log('Moving an item.');
        },
        remove: function(node, tpl) {
            console.log('Removing an item.');
            $(node).remove();
        }
     }
})
