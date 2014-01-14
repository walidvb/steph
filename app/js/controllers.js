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
  $scope.url = function(item) {
    return '#/#' + item.name;
  }
  $scope.setActiveMenu = function(id)
  {
    console.log(id);
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
controller('projectCtrl', ['$scope', '$routeParams', '$filter', '$sce', '$location', 'Projects', function($scope, $routeParams, $filter, $sce, $location, Projects) {
  Projects.query(function(data)
  {
    var project = $filter('filter')(data, {id: $routeParams.projectID});

    $scope.project = project[0];

    $scope.allSlides = $scope.project.slides;
    $scope.slides = $scope.allSlides;//.slice(0, 3);
    $scope.setActiveMenu($scope.project.type+'s');

  });
  //'s' is added to 
  console.log($location);
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

}]).
//The projectListCtrl controls both projects and shows, for the moment
controller('projectListCtrl', ['$scope',  'Projects', function($scope, Projects) {
  $scope.formats = [];

 $scope.projects = Projects.query(function(data){

  var getNewFormat = function(){
        var rdm = Math.floor(Math.random() * 2);
        return (rdm == 0) ? 'high' : 'long'
      };

  for(var i = 0; i < data.length; i++)
  {
     $scope.formats.push((i%3 >= 2) ? getNewFormat() : 'normal');
  }
 });
 $scope.getFormat = function (index){
  return Modernizr.touch ? 'normal' : $scope.formats[index];
 }
}]).
controller('bioListCtrl', ['$scope', '$filter', 'Bio', function($scope, $filter, Bio) {
  Bio.get(function(data){
    var category = 'category';
    $scope.header = data.header;
    $scope.pdf = data.pdf;
    var bio = _.groupBy(data.bio, category);

    $scope.bio = [
      {
        category: "Education", 
        data: bio.Education,
      },
      {
        category: "Awards/Scholarships/Residencies",
        data: bio.Awards
      }
    ];

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
controller('homeCtrl', ['$scope', '$location', '$anchorScroll', '$timeout', '$window', 'Home', function($scope, $location, $anchorScroll, timer, $window, Home) {
  Home.get(function(data){
    $scope.backgrounds = data.backgrounds;
    var timeout;
    $scope.scrollTo = function(id, event)
    {
      var menuHeight = 0; 
      if(id != "menu"){
            $location.hash(id); 
            menuHeight = angular.element('#menu').height();
      }
      if(angular.element('#'+id).length)
      {
        var anim = angular.element('html, body').animate({
          scrollTop: $('#'+id).offset().top -menuHeight,
        }, 800);
        angular.element($window).bind('scroll touchstart', function(){
          anim.stop();
        })
      }
    };
    timer(function(){
      $scope.scrollTo($location.$$hash, {preventDefault: function(){}})
    }, 500);
  })
}]);