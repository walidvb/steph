'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/show/:projectID', {templateUrl: 'partials/project.html', controller: 'projectCtrl'});
  $routeProvider.when('/project/:projectID', {templateUrl: 'partials/project.html', controller: 'projectCtrl'});
  $routeProvider.otherwise({redirectTo: ''});
}]);
