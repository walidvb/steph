var globals = {};

(function($){
	$(document).ready(function(){
		Mousetrap.bind('a d m i n', function(){
			window.location = '/app/admin.html';
		});
});
})(jQuery);

myApp.run(function(editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';
});