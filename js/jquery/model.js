jQuery.noConflict();
jQuery(document).ready(function($) {

// Model link
$('.model_link').click(function() {
	$('#mask').fadeIn(200);
	$('.model').delay(50).animate({
    top: ($(window).height() - $('.model').outerHeight())/2
  }, 500);
});

// Popup
$('#mask, .close').click(function() {
	$('.model').animate({ top: -($('.model').outerHeight()) - 50 });
	$('#mask').fadeOut(200);
});
$(window).resize(function(){
   $('.model').css({
     left: ($(window).width() - $('.model').outerWidth())/2
   });
});
$(window).resize();

});