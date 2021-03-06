'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ngAnimate',
  'infinite-scroll',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
run(function($rootScope, $location){
}).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  //$locationProvider.html5Mode(true);
  $routeProvider.when('/', {templateUrl: 'partials/home.html', reloadOnSearch: false, controller: 'homeCtrl'});
  $routeProvider.when('/show/:projectID', {templateUrl: 'partials/project.html', controller: 'projectCtrl'});
  $routeProvider.when('/project/:projectID', {templateUrl: 'partials/project.html', controller: 'projectCtrl'});
  $routeProvider.otherwise({redirectTo: '/'});
}]);