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
  $(document).mouseup(function(){
    setTimeout( textHighlightSharing, 100 );
  });

  function textHighlightSharing(){
    var share       = $('#selection_sharing'),
        highlight   = getHighlight();

    if (highlight.text === '' || !$(highlight.anchorNode.parentNode).parent('.formated_text').length || !$(highlight.extentNode.parentNode).parent('.formated_text').length){
      share.removeClass('visible');
      return;
    }

    var url         = window.location.href;
    var top_margin  = $('body').css('marginTop').replace( 'px', '');

    share.css('top', highlight.offset.top - top_margin - 50 + 'px')
    share.css('left', highlight.offset.left +'px');
    share.addClass('visible');

    $('.selection_sharing__twitter').attr('href','https://twitter.com/intent/tweet?text='+ encodeURIComponent(highlight.text) + encodeURIComponent('\n') +'&url=' + encodeURIComponent(url));
    $('.selection_sharing__mail').attr('href','mailto:?subject=Цитата за ресурсу: ' + encodeURIComponent(url) + '&body=' + encodeURIComponent(highlight.text) + encodeURIComponent('\n') + encodeURIComponent(url));

  };


  //==========
})(jQuery);

// function hasParentWithClass(nodeToCheck,parentClassName) {
//   if(!nodeToCheck || !parentClassName)
//     return false;
//   for (var currentNode = nodeToCheck; currentNode.tagName != 'HTML' ; currentNode = currentNode.parentNode) {
//     if(currentNode.className && currentNode.className.includes(parentClassName))
//      return true;
//   }
//   return false;
// }

function getHighlight() {
  var selection = window.getSelection(),
      object = {
        text   : '',
        anchorNode: null,
        extentNode: null,
        offset : null
      };

  if ( selection.rangeCount > 0 ) {
      var rect        = selection.getRangeAt(0).getBoundingClientRect(),
          scrollLeft  = window.pageXOffset ||document.documentElement.scrollLeft,
          scrollTop   = window.pageYOffset || document.documentElement.scrollTop;
      object = {
          text   : selection.toString().trim(),
          anchorNode: selection.anchorNode,
          extentNode: selection.extentNode,
          offset   : { top: rect.top + scrollTop, left: rect.left + scrollLeft }
      };
  }

  return object;
}



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