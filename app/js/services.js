'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
	value('version', '0.1').
	factory('Projects', ['$resource',
		function($resource)
		{
			// var ret = $resource('https://www.dropbox.com/s/9jogzvut6v8xz62/works.json');
			// console.log(ret);
			// return ret;
			return $resource('data/works.json');
		}
	]).
	factory('Bio', ['$resource',
		function($resource)
		{
			return $resource('data/bio.json', {}, {
				getData: {method: 'GET', isArray: false}
			});
		}
	]).
	factory('Home', ['$resource', 
		function($resource)
		{
			return $resource('data/theme.json', {}, {
				getData: {method: 'GET', isArray: false}
			});
		}
		]);