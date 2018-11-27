(function( $ ) {

	var default_colors = ["#212e58","#3b608e","#5d88bf","#88a2cb","#becadf", "#462556","#efefef","#333333","#ee746a","#00A1AC","#7AC4C9","#C4EBC9","#84C38D","#00618A", "#462556","#EEEFED","#333333","#FECE6D"];

	$('.percent_line').on('mouseenter', '.percent_line_sector', function() {
		$(this).append('<div class="info_box"><div class="info_box__title">' + $(this).data('title') + '</div><div class="info_box__per"><i class="dot" style="background-color: '+ $(this).css("background-color")  +'"></i><span>'+ $(this).data('percent') +'<span></div></div>')
	});

	$('.percent_line').on('mouseleave', '.percent_line_sector', function() {
		$(this).children('.info_box').remove();
	});

	$('.mc_diagram').on('click', '.mc_diagram__accordion_item_control', function() {
		$(this).parent().toggleClass('opened');
	});

	$.fn.percentLine = function(line_data,color_theme) {
		var colors = '';

		if(!color_theme)
			colors = default_colors

		line_data.map( (obj ,index) => {
			$(this).append('<div data-percent="' + obj.value.toFixed(1).replace(',','.') + '%" data-title="' + obj.title + '" class="percent_line_sector" style="width: ' + obj.value + '% ; background:' + colors[index] + '"></div>');
		});
	}

	$.fn.ballsDiagram = function(data,color_theme) {
		var colors = color_theme ? color_theme : default_colors;
		var ratio = countRatio(data);

		data.map( (obj,index) => {
			var ball_size = (15 * ( obj.value * ratio / 100 )).toFixed(2)
			var ball_padding = ( 15 - ball_size ) / 2;

			$(this).append('<div class="balls_diagram__row"><div class="balls_diagram__ball" style="margin-left: '+ ball_padding + 'rem;min-width: ' + ball_size + 'rem; min-height: ' + ball_size + 'rem; background: ' + colors[index] + '"></div><div class="balls_diagram__line"></div><div class="balls_diagram__label">' + obj.label + '</div><div class="balls_diagram__data">' + obj.value.toFixed(1).replace(',','.') + '%</div></div>')
		});

		function countRatio(data) {
			var nums = data.map( obj => obj.value);

			return 100 / (Math.max.apply(null, nums) - (Math.min.apply(null, nums))*1.5);
		}
	}


}( jQuery ));



