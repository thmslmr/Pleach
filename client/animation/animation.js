// Template.inbox.onRendered(function(){
//
//         $('.messagerie__layout').velocity('transition.slideLeftBigIn')
// })
//
// Template.inbox.uihooks({
//
//         '.messagerie__layout': {
//             remove: function(node, tpl) {
//                 $('.messagerie__layout').velocity('transition.slideLeftBigIn')
//                 $(node).remove();
//             }
//         }
//     })

    Template.inbox.uihooks({
      '.inbox': {
        container: '.messagerie__layout',
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
    });
