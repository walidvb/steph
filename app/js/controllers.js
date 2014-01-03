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
      var category = 'category';
    	$scope.header = data.header;
    	$scope.pdf = data.pdf;
      var bio = _.groupBy(data.bio, category);
      var experiences = bio.Solo.concat(bio.Group);
      var groupedExp = _.groupBy(experiences, "date");
      $scope.bio = {};
      $scope.bio.Awards = bio.Awards;
      $scope.bio.Education = bio.Education;

      var years = new Array();
      angular.forEach(groupedExp, function(year, experiences){
        var currentYear = {}
      });
      delete $scope.bio.Solo;
      delete $scope.bio.Group;
    });
  }]).
  controller('homeCtrl', ['$scope', 'Home', function($scope, Home) {
    Home.get(function(data){
      $scope.backgrounds = data.backgrounds;
      $scope.test = {url: 'test', type: 'img'};
    })
  }]);