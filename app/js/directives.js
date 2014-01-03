'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elem, attrs) {
		elem.text(version);
	};
}]).
directive('fixedMenu', function(){
	return{
		link: function(scope, elem, attr){
			var menu_pos = $(elem).offset().top;
			var menu_height = $(elem).height();
			var oldPadding = $('body').css('paddingTop');

			var fixMenu = function(){
				var pos = $(window).scrollTop();
				if( pos >= menu_pos)
				{
					$(elem).addClass('navbar-fixed-top');
					$('body').css('paddingTop', menu_height);
				}
				else
				{
					$(elem).removeClass('navbar-fixed-top');
					$('body').css('paddingTop', oldPadding);
				}
			}
			$(window).on('scroll', function()
			{
				fixMenu();
			}).
			on('resize', function(){
				menu_pos = $(elem).offset().top;
				menu_height = $(elem).outerHeight(true);
				oldPadding = $('body').css('paddingTop');
			});
		}
	}
}).
directive('myFullscreen', function(){
	return function(scope, elem, attrs){
			$(elem).height($(window).height()-$('#menu').height());
		}
}).
directive('myBackgroundImg', function(){
	return {
		restrict: 'AE',
		templateUrl: "partials/backgrounds.html",
		scope: {
			background: "=backgroundProps",
			test: "=",
		}
	}
});
