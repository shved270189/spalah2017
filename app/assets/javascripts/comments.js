$(function() {
  // console.log($('#new_comment'));
  $('button.test').click(function() {

    var old_res = parseInt($('span.click-result').text());

    $('span.click-result').text(old_res + 1);
  });

});

$(function() {
  $('form#new_comment').on('ajax:success', function(event, response, status) {

    var $form = $(event.currentTarget);
    console.log(response);
    $('.comment-errors').html('');
    if (response.errors) {
      for (var field in response.errors) {
        var $el = $('<li></li>');
        var msg = field + ': ';

        for(var i = 0; response.errors[field].length > i; ++i) {
          msg += response.errors[field][i] + '; ';
        }
        $el.text(msg);
        $el.appendTo('.comment-errors');
      }
    } else {
      var $el = $('<li></li>');
      $el.text(response.nick + ' : ' + response.text);
      $el.appendTo('#comments-list');
      $form.find('[name="comment[text]"]').val('');
    }
  })
});


// $(function() {
//   $('form#new_comment').submit(function(event) {
//     console.log('SUBMIT!');
//
//     var $form = $(event.currentTarget);
//     console.log($form.attr('action'));
//     console.log($form.attr('method'));
//
//     var url = $form.attr('action');
//     var method = $form.attr('method');
//     $.ajax(url, {
//       method: method,
//       success: function(response) {
//         console.log(response);
//         $('.comment-errors').html('');
//         if (response.errors) {
//           for (var field in response.errors) {
//             var $el = $('<li></li>');
//             var msg = field + ': ';
//
//             for(var i = 0; response.errors[field].length > i; ++i) {
//               msg += response.errors[field][i] + '; ';
//             }
//             $el.text(msg);
//             $el.appendTo('.comment-errors');
//           }
//         } else {
//           var $el = $('<li></li>');
//           $el.text(response.nick + ' : ' + response.text);
//           $el.appendTo('#comments-list');
//           $form.find('[name="comment[text]"]').val('');
//         }
//       },
//       data: { comment: {
//         nick: $form.find('[name="comment[nick]"]').val(),
//         text: $form.find('[name="comment[text]"]').val()
//       } }
//     });
//     return false;
//   });
// });