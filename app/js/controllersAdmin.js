'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('appCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){
  $scope.menu = [
    {name: 'projects'},
    {name: 'shows'},
    {name: 'bio'},
    {name: 'contact'}
    ];
  $scope.currentMenu = '';
  $scope.setActiveMenu = function(id)
  {
    $($scope.menu).each(function(){
      if(this.name == id)
      {
        this.active = true;
      }
      else
      {
        this.active = false;
      }
    })
  };
  
  $scope.scrollTo = function(id, event)
    {
      console.log($location);
      //event.preventDefault();
      $//location.hash(id);
      // setTimeout($anchorScroll, 1000);
      //reset to old to keep any additional routing logic from kicking in
      //$location.hash(old); 
    };
}]).
  controller('projectCtrl', ['$scope', 'Projects', function($scope, Projects) {
    
  // projects = Projects.query();
  // projectID = $routeParams.projectID
  // project = $filter('filter')();
 //  $scope.project = project;
  }]).
  controller('projectListCtrl', ['$scope', '$location', 'Projects', function($scope, $location, Projects) {
    console.log($location);
    $scope.projects = Projects.query(function(data){
      $scope.activeProject = data[0];
    });
    $scope.activeProject = {};

    $scope.filter = ($location.$$path == '/projects') ? 'project' : 'show';    
    $scope.slideOptions = ["img", "html"];

    $scope.setActiveProject = function(project){
      $scope.activeProject.active = false;
      $scope.activeProject = project;
      project.active = true;
    };

    $scope.addProject = function(){
      var newProject = {
        title: 'New project',
        type: 'project',
        slides: [],
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
    var init = function(data){
      var category = 'category';
      $scope.raw = data;
      $scope.header = data.header;
      $scope.pdf = data.pdf;
      var bio = _.groupBy(data.bio, category);
      var experiences = bio.Solo.concat(bio.Group);
      var groupedExp = _.groupBy(experiences, "date");
      $scope.bio = {};
      $scope.bio.Awards = bio.Awards;
      $scope.bio.Education = bio.Education;

      var years = [];
      angular.forEach(groupedExp, function(exp, yearIndex){
        var year = {
          year: yearIndex,
          experiences: exp,
        }
        years.push(year);
      })
      $scope.Experiences = years;
      
      delete $scope.bio.Solo;
      delete $scope.bio.Group;

    };
    Bio.get(init);
    $scope.addLine = function(){
      var newLine = {
      };
      $scope.raw.bio.push(newLine);
    };
  }]).
  controller('homeCtrl', ['$scope', 'Home', function($scope, Home) {
    Home.get(function(data){
      $scope.backgrounds = data.backgrounds;
      $scope.test = {url: 'test', type: 'img'};
    })
  }]);