(function() {

   $(window).scroll(function() {
		var win = $(window);
		var main_header = $('.main_header');
		var is_scroll_distance = win.scrollTop() > ( win.height() * 0.8 );

    is_scroll_distance && main_header ? main_header.addClass('minified') : main_header.removeClass('minified');

  });

  $(window).resize(function() {
  });

  new WOW().init();

function setVideoHeight() {
  var a = $( '#main-video-box' );
  var b = $( '#video-modal .video-wrapper' );
  var c = b.width() * 0.56;

  a.height(c);
  b.height(c);
}



//Hamburger toggle

$(".hamburger").click(function(){
	$(this).toggleClass("is_active");
	$('header').toggleClass("expanded");
});

//=====

})(jQuery);

var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutCubic' // Easing pattern to use
});

window.onload = function () {
   document.querySelector('#loader_screen').className = 'ontop';
   document.querySelector('.main_header').className += ' animated';
  }
