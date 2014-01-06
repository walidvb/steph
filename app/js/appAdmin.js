'use strict';


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'xeditable',
  'ui.bootstrap',
  'ui.sortable',
  'ui.tinymce'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/projects', {templateUrl: 'partials/projectListAdmin.html', controller: 'projectListCtrl'});
  $routeProvider.when('/shows', {templateUrl: 'partials/projectListAdmin.html', controller: 'projectListCtrl'});
  $routeProvider.when('/bio', {templateUrl: 'partials/bioAdmin.html', controller: 'bioCtrl'});
  $routeProvider.when('/contact', {templateUrl: 'partials/contactAdmin.html', controller: 'contactCtrl'});

  $routeProvider.otherwise({redirectTo: ''});
}]);

//xeditable options
myApp.run(function(editableOptions, editableThemes) {
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
  });