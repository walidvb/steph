'use strict';

/* Directives */


angular.module('myApp.directives', []).
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
				menu_height = $(elem).height();
				oldPadding = $(body).css('paddingTop');
			});
		}
	}
}).
directive('myBackgroundImg', function(){
	return {
		restrict: 'AE',
		templateUrl: "partials/backgrounds.html",
		scope: {
			background: "=backgroundprops",
			test: "=",
		},
		link: function(scope, elem, attrs){
			$(elem).height($(window).height()-$('#menu').height());
		}
	}
}).
directive('myJsonOutput', function(){
	return {
		template: "<textarea>{{projects | json}}</textarea>",
		link: function(scope, elem, attrs){
			console.log(elem);
			elem = $(elem);
			elem.on('focus', function() 
			{
				console.log('focus');
				elem.select();

		        // Work around Chrome's little problem
		        elem.on('mouseup', function() 
		        {
		            // Prevent further mouseup intervention
		            elem.onmouseup = null;
		            return false;
		        });
	    	});
		},
	}
});
