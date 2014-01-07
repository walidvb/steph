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
}]).
controller('projectListCtrl', ['$scope', '$location', 'Projects', function($scope, $location, Projects) {
  //$scope.filter = {};
  $scope.filterType = ($location.$$url == '/shows') ? 'show' : 'project';
  $scope.tinymceOptions = 
  {
    plugins: [
    "advlist autolink lists link image charmap print preview anchor",
    "searchreplace visualblocks code fullscreen",
    "insertdatetime media table contextmenu paste"
    ],
    toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    autosave_ask_before_unload: false,
    max_height: 200,
    min_height: 160,
    height : 180
  };

  $scope.filter = ($location.$$path == '/projects') ? 'project' : 'show';

  $scope.projects = Projects.query(function(data){
    $scope.activeProject = _.find(data, function(project){ return project.active && project.type == $scope.filter});
  }); 

  $scope.slideOptions = ["img", "html"];

  $scope.setActiveProject = function(project){
    console.log($scope.activeProject);
    if($scope.activeProject)
    {
      console.log("wasn't undefined");
      $scope.activeProject.active = false;
    }
    $scope.activeProject = project;
    project.active = true;
  };

  $scope.addProject = function(projects){
    var newProject = {
      title: 'New ' + $scope.filterType,
      type: $scope.filterType,
      id: 'new_' + $scope.filterType,
      thumb: 'img/thumbs/black.jpg',
      slides: [],
    };
    projects.push(newProject);
    $scope.setActiveProject(newProject);
  };

  $scope.removeProject = function(project){
    var index = $scope.projects.indexOf(project);
    console.log(index);
    if (index > -1) {
      $scope.projects.splice(index, 1);
    }
  };

  $scope.addSlide = function(slides){
    var newSlide = {
      type: 'img',
      url: 'img/'+$scope.activeProject.id+'/',
    };
    slides.push(newSlide);
  }
  $scope.removeSlide = function(slide){
    var index = $scope.activeProject.slides.indexOf(slide);
    if (index > -1) {
      $scope.activeProject.slides.splice(index, 1);
    }
  };

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
    });
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