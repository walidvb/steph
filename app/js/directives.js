'use strict';

/* Directives */


angular.module('myApp.directives', []).
directive('appVersion', ['version', function(version) {
	return function(scope, elem, attrs) {
		elem.text(version);
	};
}]).
directive('fixedMenu', ['$timeout', function(timer){
	return{
		link: function(scope, elem, attr){
			var fixIt = function(){
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
			};
			timer(fixIt, 0);
		}
	}
}]).
directive('myFullscreen', ['$timeout', function(timer){
	return function(scope, elem, attrs){
		var setSize = function() {$(elem).height($(window).height()-$('#menu').height())};
		$(window).on('scroll resize', function()
				{
					setSize();
				})
		timer(setSize, 0);
	}
}]).
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
