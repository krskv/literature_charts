(function( $ ) {

	// var colors = ["#212e58","#3b608e","#5d88bf","#88a2cb","#becadf", "#462556","#efefef","#333333","#ee746a"];

	$('.percent_line').on('mouseenter', '.percent_line_sector', function() {
		$(this).append('<div class="info_box"><div class="info_box__title">' + $(this).data('title') + '</div><div class="info_box__per"><i class="dot" style="background-color: '+ $(this).css("background-color")  +'"></i><span>'+ $(this).data('percent') +'<span></div></div>')
	});

	$('.percent_line').on('mouseleave', '.percent_line_sector', function() {
		$(this).children('.info_box').remove();
	});

	$('.mc_diagram').on('click', '.mc_diagram__accordion_item_control', function() {
		var that = $(this).parent();
		console.log('asdasd');

		if(that.hasClass('opened')){
			that.removeClass('opened');
			return
		}

		var openedSibling = that.siblings('opened');

		if(openedSibling)
		openedSibling.removeClass('opened');

		that.addClass('opened');
	});

	$.fn.percentLine = function(line_data,color_theme) {
		line_data.map( (obj ,index) => {
			$(this).append('<div data-percent="' + obj.value.toFixed(1).replace(',','.') + '%" data-title="' + obj.title + '" class="percent_line_sector" style="width: ' + obj.value + '% ; background:' + color_theme[index%10] + '"></div>');
		});
	}

}( jQuery ));



