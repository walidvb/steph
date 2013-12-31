var globals = {};

(function($){
	$(document).ready(function(){
	var init = function() {
		$('.background-img').height($(window).height());
		globals.menu_pos = $('#menu').offset().top;
	}

	init();
	$(window).on('resize',function(){
		init();
	});
});
})(jQuery);