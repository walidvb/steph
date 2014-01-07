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
    var project = $filter('filter')(data, $routeParams.projectID, 'url');
    $scope.project = project[0];
    
    $scope.nextSlide = function(index){
      if(index < $scope.project.slides.length)
      {
        var nextSlide =  $('.slide-' + (index+1) );
        var pos = nextSlide.position().left;
        $('.project-details').animate({
          'scrollLeft': '+='+pos
        });
      }
    };
  })

}]).
controller('projectListCtrl', ['$scope',  'Projects', function($scope, Projects) {
 $scope.projects = Projects.query();
}]).
controller('bioListCtrl', ['$scope', 'Bio', function($scope, Bio) {
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
    angular.forEach(shows, function(shows, showType){
      var groupedExp = _.groupBy(shows, "date");
      var years = [];
      angular.forEach(groupedExp, function(exp, yearIndex){
        var year = {
          year: yearIndex,
          experiences: exp,
        };
        years.push(year);
      });
      console.log(years);
      $scope.shows.push( 
        {
          shows: years,
          categoryName: showType
        });
    });

    console.log($scope.shows);
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