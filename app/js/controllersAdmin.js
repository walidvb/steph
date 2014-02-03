'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
controller('appCtrl', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll){
  $scope.menu = [
    {name: 'projects'},
    {name: 'shows'},
    // {name: 'bio'},
    // {name: 'contact'}
  ];
  $scope.currentMenu = '';
  $scope.url = function(item) {
    return '#/' + item.name;
  }
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
    if(typeof project == 'number')
    {
      project = $scope.projects[0];
    }


    if($scope.activeProject)
    {
      $scope.activeProject.active = false;
    }
    $scope.activeProject = project;
    project.active = true;
  };

  var dummyProject = function() {
    return {
        title: 'New ' + $scope.filterType,
        public: true,
        type: $scope.filterType,
        id: 'new_' + $scope.filterType,
        thumb: 'img/thumbs/black.jpg',
        slides: [],
      }
    };

  $scope.validates = function(project, $index){
    var i = 0;// $index || 0

    
    //check if has a proper url
    if(project.id == dummyProject.id)
    {
      return false;
    }
    //check if project has at least one public slide
    if(project.slides.length == 0)
    {
      return false;
    }
    else
    {
      var publicExists = false;
      for(var j = 0; j < project.slides.length; j++)
      {
        if(project.slides[j].public)
          publicExists = true;  
      }
      if(!publicExists)
      {
        return false;
      }
    }
    //complexity is obviously too high, this should of course run only for following projects. however, to not add an attribute in the json(that should only be used in the admin), check is run that way...
    for(; i < $scope.projects.length; i++)
    {
      if(project !== $scope.projects[i] && project.id == $scope.projects[i].id && project.type == $scope.projects[i].type)
      {
        return false;
      }
    }
    return true;
  }

  $scope.addProject = function(projects){
    var proj = new dummyProject()
    projects.push(proj);
    $scope.setActiveProject(proj);
  };

  $scope.removeProject = function(project){
    var index = $scope.projects.indexOf(project);
    if (index > -1) {
      $scope.projects.splice(index, 1);
    }
    $scope.setActiveProject(0);
  };
  
  $scope.addSlide = function(slides){
    var newSlide = {
      type: 'img',
      url: 'img/'+$scope.activeProject.id+'/',
      legend: 'legend',
      public: true,
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
    var newLine = {};
    $scope.raw.bio.push(newLine);
  };
}]).
controller('homeCtrl', ['$scope', 'Home', function($scope, Home) {
  Home.get(function(data){
    $scope.backgrounds = data.backgrounds;
    $scope.test = {url: 'test', type: 'img'};
  })
}]);