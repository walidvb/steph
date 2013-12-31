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
  }]).
  controller('bioListCtrl', ['$scope', 'Bio', function($scope, Bio) {
    Bio.get(function(data){
    	$scope.header = data.header;
    	$scope.bio = data.bio;
    	$scope.pdf = data.pdf;
    });
  }]).
  controller('homeCtrl', ['$scope', 'Home', function($scope, Home) {
    Home.get(function(data){
      $scope.backgrounds = data.backgrounds;
      $scope.test = {url: 'test', type: 'img'};
    })
  }]);