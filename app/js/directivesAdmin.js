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
				oldPadding = $('body').css('paddingTop');
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
directive('myModalTrigger', function(){
	return{
		link: function(scope, elem, attrs){
			elem.on('click', function(){
				$(attrs.target).modal('show');
			});
		}
	}
}).
directive('myModal', function(){
	return{
		scope: {
			data: '=myData',
		},
		templateUrl: "partials/modalResult.html",
		link: function(scope, elem, attrs){
			//$('#modal-result').modal();
		}
	}
}).
directive('myJsonOutput', function(){
	return {
		scope: {
			data: '=myData',
		},
		templateUrl: "partials/modalResult.html",
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
}).
directive('myHtml', ['$timeout', '$sce', function(timer, $sce){
	return {
		scope: {
			html : "="
		},
		link: function(scope, elem, attrs)
		{
			var depth = (scope.html).split('.');
			console.log(elem);
			if(depth.length == 2)
			{
				scope.$parent[depth[0]][depth[1]] = scope.$parent[depth[0]][depth[1]] || 'html';
				scope.$parent[depth[0]][depth[1]] = $sce.trustAsHtml(scope.$parent[depth[0]][depth[1]]);
			}
			else
			{
				scope.$parent[depth[0]] = 'html';
				scope.$parent[depth[0]] = $sce.trustAsHtml(scope.$parent[depth[0]]);
			}

		}
	}
}]).
directive('addItem', ['$timeout', function(){
	return {
		restrict: 'A',
		template: '<button class="btn btn-large"> Add</button>',
		link: function(scope, elem, attrs) {

		},
	}
}]).
directive('deleteItem', ['$timeout', function(timer){
	return {
		restrict: 'AE',
		scope: {
			itemType: "=itemType",
			class: "=myClass"
		},
		template: '<button class="btn btn-danger" net.Socket(options);g-class="{class}"> Delete {{itemType}}</button>',
		link: function(scope, elem, attrs) {

		},
	}
}]);
