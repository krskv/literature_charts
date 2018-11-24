(function( $ ) {

	$('.percent_line').on('mouseenter', '.percent_line_sector', function() {
		$(this).append('<div class="info_box"><div class="info_box__title">' + $(this).data('title') + '</div><div class="info_box__per"><i class="dot" style="background-color: '+ $(this).css("background-color")  +'"></i><span>'+ $(this).data('percent') +'<span></div></div>')
	});

	$( document ).ready(function() {
		togglePercentsOnLine();
  });

	$(window).resize(function() {
		togglePercentsOnLine();
	});

	$('.percent_line').on('mouseleave', '.percent_line_sector', function() {
		$(this).children('.info_box').remove();
	});


	$.fn.percentLine = function(line_data,color_theme) {
		line_data.map( (obj ,index) => {
			$(this).append('<div data-percent="' + obj.value.toFixed(1).replace('.',',') + '%" data-title="' + obj.title + '" class="percent_line_sector" style="width: ' + obj.value + '% ; background:' + color_theme[index%10] + '"></div>');
		});
	}

	var togglePercentsOnLine = function () {
		console.log(isResponsive());
	};

	var isResponsive = () => $(window).width() < 992;

}( jQuery ));

