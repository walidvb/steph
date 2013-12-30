'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('projectCtrl', ['$scope', 'Projects', function($scope, Projects) {
  	
	// projects = Projects.query();
	// projectID = $routeParams.projectID
	// project = $filter('filter')();
 //  	$scope.project = project;
  }]).
  controller('projectListCtrl', ['$scope', 'Projects', function($scope, Projects) {
  	$scope.projects = Projects.query();
  }]);

var projListCtrl = function($scope, Projects) {
  	$scope.projects = Projects.query();

}