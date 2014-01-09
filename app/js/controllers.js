'use strict';


/* Controllers */

angular.module('myApp.controllers', []).
controller('appCtrl', ['$scope', '$location', '$anchorScroll', '$sce', function($scope, $location, $anchorScroll, $sce){
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
      //event.preventDefault();
      $location.hash(id);
      setTimeout($anchorScroll, 200);
      //reset to old to keep any additional routing logic from kicking in
      //$location.hash(old); 
    };
}]).
controller('projectCtrl', ['$scope', '$routeParams', '$filter', '$sce', 'Projects', function($scope, $routeParams, $filter, $sce, Projects) {
  Projects.query(function(data)
  {
    var project = $filter('filter')(data, {id: $routeParams.projectID});

    $scope.project = project[0];

    $scope.allSlides = $scope.project.slides;
    $scope.slides = $scope.allSlides;//.slice(0, 3);
    $scope.loadSlide = function(){
      var lastSlideIndex = $scope.slides.length;
      var newSlides = $scope.allSlides.slice(lastSlideIndex, lastSlideIndex+3);
      $scope.slides = $scope.slides.concat(newSlides);
    };

    $scope.nextSlide = function(index){
      if(index < $scope.project.slides.length)
      {
        var nextSlide =  $('.slide-' + (index+1) );
        var pos = nextSlide.position().left;
        $('.project-details').animate({
          'scrollLeft': '+='+pos,
        });
      }
    };
  })

}]).
controller('projectListCtrl', ['$scope',  'Projects', function($scope, Projects) {
 $scope.projects = Projects.query();
}]).
controller('bioListCtrl', ['$scope', '$filter', 'Bio', function($scope, $filter, Bio) {
  Bio.get(function(data){
    var category = 'category';
    $scope.header = data.header;
    $scope.pdf = data.pdf;
    var bio = _.groupBy(data.bio, category);

    $scope.bio = {
      Awards: bio.Awards,
      Education: bio.Education,
    };

    $scope.shows = [];
    var shows = {
      Group: bio.Group,
      Solo: bio.Solo,

    };
    // for each solo & group show
    angular.forEach(shows, function(shows, showType){
      //format dates
      angular.forEach(shows, function(show){ show.date = $filter("date")(show.date, 'yyyy');})
      //group shows by dates
      var groupedExp = _.groupBy(shows, "date");
      var years = [];
      angular.forEach(groupedExp, function(exp, yearIndex){
        var year = {
          year: yearIndex,
          experiences: exp,
        };
        years.push(year);
      });
      $scope.shows.push( 
        {
          shows: years,
          categoryName: showType
        });
    });
    delete $scope.bio.Solo;
    delete $scope.bio.Group;
  });
}]).
controller('homeCtrl', ['$scope', '$location', '$anchorScroll', 'Home', function($scope, $location, $anchorScroll, Home) {
  Home.get(function(data){
    $scope.backgrounds = data.backgrounds;
    $scope.scrollTo = function(id, event)
    {
      event.preventDefault();
     var old = $location.hash();
     $location.hash(id);
     $anchorScroll();
      //reset to old to keep any additional routing logic from kicking in
      $location.hash(old); 
    };
  })
}]);