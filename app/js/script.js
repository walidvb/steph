var globals = {};
var clip;
(function($){
	$(document).ready(function(){
		Mousetrap.bind('a d m i n', function(){
			window.location = '/app/admin.html';
		});
	});
})(jQuery);

