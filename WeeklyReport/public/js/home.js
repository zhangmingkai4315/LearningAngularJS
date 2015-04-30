var semantic_home = {};

// ready event
semantic_home.ready = function() {

  var $header        = $('.masthead'),
      $library       = $header.find('.library'),
      handler
  ;

  handler = {
    endAnimation: function() {
      $header
        .addClass('stopped')
      ;
    },
    introduction: function() {
      // zoom out
      setTimeout(function() {
        $header
          .removeClass('zoomed')
        ;
      }, 500);
      setTimeout(function() {
        $library.transition('scale in', 1000);
      }, 0);

    }
};
  handler.introduction();
}

// attach ready event
$(document).ready(semantic_home.ready)
;








