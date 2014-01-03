'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('projectCtrl', ['$scope', 'Projects', function($scope, Projects) {
    
  // projects = Projects.query();
  // projectID = $routeParams.projectID
  // project = $filter('filter')();
 //  $scope.project = project;
  }]).
  controller('projectListCtrl', ['$scope', 'Projects', function($scope, Projects) {
    $scope.projects = Projects.query();
    $scope.activeProject = {};
    $scope.filter = "project";    
    $scope.slideOptions = ["img", "html"];

    $scope.setActiveProject = function(project){
      $scope.activeProject.active = false;
      $scope.activeProject = project;
      $scope.projects
      project.active = true;
    };

    $scope.addProject = function(){
      var newProject = {
        title: 'New project',
        type: 'project',
      };
      $scope.projects.push(newProject);
      $scope.setActiveProject(newProject);
    };

    $scope.addSlide = function(slides){
      var newSlide = {
        type: 'image',
      };
      slides.push(newSlide);
    }
  }]).
  controller('bioCtrl', ['$scope', 'Bio', function($scope, Bio) {
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