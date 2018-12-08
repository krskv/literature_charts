(function() {

   $(window).scroll(function() {
		var win                 = $(window);
		var main_header         = $('.main_header');
		var is_scroll_distance  = win.scrollTop() > ( win.height() * 0.8 );

    is_scroll_distance && main_header ? main_header.addClass('minified') : main_header.removeClass('minified');

  });

  $(window).resize(function() {
  });

  //WOW PLUGIN INITIALIZATION
  new WOW().init();
  //==========

  //HAMBURGER TOGGLE

  $(".hamburger").click(function(){
    $(this).toggleClass("is_active");
    $('header').toggleClass("expanded");
  });

  //==========

  //HIGHLIGHTED TEXT SHARING

  //Activate highlighted text sharing
  $('.formated_text').mouseup(function(){
    setTimeout( textHighlightSharing, 100 );
  });

  function textHighlightSharing(){
    var share       = $('#selection_sharing'),
        highlight   = getHighlight();

    if (highlight.text === ''){
      share.removeClass('visible');
      return;
    }

    var url         = window.location.href;
    var top_margin  = $('body').css('marginTop').replace( 'px', '');

    share.css('top', highlight.offset.top - top_margin - 50 + 'px')
    share.css('left', highlight.offset.left +'px');
    share.addClass('visible');

    $('.selection_sharing__twitter').attr('href','https://twitter.com/intent/tweet?text='+ encodeURIComponent(txt) + encodeURIComponent('\n') +'&url=' + encodeURIComponent(url));
    $('.selection_sharing__mail').attr('href','mailto:?subject=' + encodeURIComponent(txt) + '&body=' + encodeURIComponent(txt) + encodeURIComponent('\n') + encodeURIComponent(url));

  };

  function getHighlight() {

    var selection = window.getSelection(),
        object = {
          text   : '',
          offset : null
        };

    if ( selection.rangeCount > 0 ) {
        var rect        = selection.getRangeAt(0).getBoundingClientRect(),
            scrollLeft  = window.pageXOffset ||document.documentElement.scrollLeft,
            scrollTop   = window.pageYOffset || document.documentElement.scrollTop;
        object = {
            text   : selection.toString().trim(),
            offset   : { top: rect.top + scrollTop, left: rect.left + scrollLeft }
        };
    }

    return object;
  }

  //==========
})(jQuery);

//SMOOTHSCROLL ACTIVATION
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000, // Integer. How fast to complete the scroll in milliseconds
  easing: 'easeInOutCubic' // Easing pattern to use
});
//==========

//ACTIVATE ONLOAD ANIMATION
window.onload = function () {
  var loader_screen   = document.querySelector('#loader_screen');
  var main_header     =  document.querySelector('.main_header');

  if (loader_screen)
    loader_screen.className = 'ontop'
  if (main_header)
    main_header.className += ' animated';
}
//==========