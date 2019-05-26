fullscreen();
$(window).resize(fullscreen);

function fullscreen() {
	var masthead = $('.masthead');
	var windowH = $(window).height();
	var windowW = $(window).width();

	masthead.width(windowW);
	masthead.height(windowH);
}




/*$(window).scroll(function() {    
	var scroll = $(window).scrollTop();
    $('.masthead-arrow').css({'opacity':(( 100-scroll )/100)+0.1});
});*/



$(window).scroll(function() {
	var scroll = $(window).scrollTop();

		if ($(this).scrollTop() < 100) {
			$('.masthead-arrow').fadeIn("slow");
		} else {
			$('.masthead-arrow').fadeOut("slow");
		}
	});


/*$(window).scroll(function() {    
	var scroll = $(window).scrollTop();
    $('.masthead-arrow').css({'opacity':(( 100-scroll )/100)+0.1});
});*/


