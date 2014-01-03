'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {templateUrl: 'partials/home.html'});
  $routeProvider.when('/projects', {templateUrl: 'partials/projectListAdmin.html', controller: 'projectListCtrl'});
  $routeProvider.when('/shows', {templateUrl: 'partials/showListAdmin.html', controller: 'projectListCtrl'});
  $routeProvider.when('/bio', {templateUrl: 'partials/bioAdmin.html', controller: 'bioCtrl'});
  $routeProvider.when('/contact', {templateUrl: 'partials/contactAdmin.html', controller: 'contactCtrl'});

  $routeProvider.otherwise({redirectTo: ''});
}]);
