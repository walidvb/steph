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
				console.log('menu_pos', menu_pos);
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
					fixMenu();
				});
			};
			timer(fixIt, 0);
		}
	}
}]).
directive('myFullscreen', ['$timeout', function(timer){
	return function(scope, elem, attrs){
		var setSize = function() {
			console.log('window', $(window).height());
			console.log('menu', $('#menu').height());
			$(elem).height($(window).height()-$('#menu').height())
				.css('overflow', 'auto')
		};
		$(window).on('resize', function()
		{
			setSize();
		});
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
}).
directive('mySlide', function(){
	return {
		restrict: 'AE',
		templateUrl: "partials/slide.html",
		scope: {
			slide: "=mySlides",
		}
	}
}).
directive('myCarousel', ['$timeout', function(timer){
	return{
		link: function(scope, elem, attrs)
		{
			var slideIt = function()
			{
				$(elem).scrollsnap({
					direction: 'x',
					snaps: '.slide',
					proximity: 350,
				});
			};
			timer(slideIt, 1000);
		},
	};
}]).
directive('myHtml', ['$timeout', '$sce', function(timer, $sce){
	return {
		link: function(scope, elem, attrs)
		{
			scope.$parent.slide.body = $sce.trustAsHtml(scope.$parent.slide.body);
			var center = function(){
				var wrapperHeight = $(elem).parents('.slide').height();
				var elemHeight = $(elem).height();
				$(elem).css({
					position: 'relative',
					top: wrapperHeight/2 - elemHeight/2,
				})
			};
			timer(function(){
			center();
			$(window).on('resize', center);
		}, 0);
		}
	}
}]).
directive('myCenter', ['$timeout', function(timer){
	return {
		link: function(scope, elem, attrs)
		{
			var center = function(){
				var wrapperHeight = $(elem).parents('').height();
				var elemHeight = $(elem).height();
				$(elem).css({
					position: 'relative',
					top: wrapperHeight/2 - elemHeight/2,
				})
			};
			timer(function(){
				center();
				$(window).on('resize', center);
			}, 500);
		}
	}
}]);
