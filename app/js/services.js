'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', ['ngResource']).
	factory('Projects', ['$resource',
		function($resource)
		{
			 //var ret = $resource('https://dl.dropboxusercontent.com/s/9jogzvut6v8xz62/works.json',{}, {
				// getData: {method: 'GET'}});
			 return  $resource('data/works.json',{}, {
				getData: {method: 'GET'}});
			//return $resource('data/works.json');
		}
	]).
	factory('Bio', ['$resource',
		function($resource)
		{
			//return $resource('https://dl.dropboxusercontent.com/s/530sngulreuq3fe/bio.json', {}, {
				// getData: {method: 'GET', isArray: false}
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
			// return $resource('https://dl.dropboxusercontent.com/s/hpjp932yzrwnlzp/theme.json', {}, {
			// 	getData: {method: 'GET', isArray: false}
			// });
		}
		]);