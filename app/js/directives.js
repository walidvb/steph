angular.module('myApp.directives', []).
directive('scrollSpy', ['$timeout', function(timer){
  return {
  }
}]).
directive('fixedMenu', ['$timeout', function(timer){
  return{
    link: function(scope, elem, attr){
      var fixIt = function(e){
        var menu_pos = $(elem).offset().top;
        var menu_height = $(elem).height();
        var oldPadding = $('body').css('paddingTop');

        var timeout;
        var fixMenu = function(e){

          var pos = $(window).scrollTop();
          if( pos >= menu_pos)
          {
            $(elem).addClass('navbar-fixed-top');
            $('body').css('paddingTop', menu_height);
          }
          else
          {
            $(elem).removeClass('navbar-fixed-top');
            $('body').css('paddingTop', oldPadding);
          }
        }
        $(window).on('scroll', function(e)
        {
          fixMenu(e);
        }).
        on('resize', function(e){
          menu_pos = $(elem).offset().top;
          menu_height = $(elem).outerHeight(true);
          oldPadding = $('body').css('paddingTop');
          fixMenu(e);
        });
      };
      timer(fixIt, 0);
    }
  }
}]).
directive('myAccordion', ['$timeout', function(timer){
  return {
    link: function(scope, elem, attrs){
      timer(function(){
        angular.element(elem).bind('click', function(){
          $(this).siblings('.section-body').slideToggle(800);
        })
      }, 0);
    }
  }
}]).
directive('myFullscreen', ['$timeout', function(timer){
  return function(scope, elem, attrs){
    if(!Modernizr.touch)
    {
      var setSize = function() {
        $(elem).height($(window).height()).css('overflow', 'auto')
      };
      $(window).on('resize', function()
      {
        setSize();
      });
      timer(setSize, 0);
    }
  }
}]).
directive('myBackgroundImg', function(){
  return {
    restrict: 'AE',
    templateUrl: "partials/backgrounds.html",
    scope: {
      background: "=backgroundProps",
      test: "=",
    }
  }
}).
directive('mySlide', function(){
  return {
    restrict: 'AE',
    templateUrl: "partials/slide.html",
    scope: {
      slide: "=mySlides",
    }
  }
}).
directive('myHtml', ['$timeout', '$sce', function(timer, $sce){
  return {
    scope: {
      myHtml : "=",
    },
    template: "<span ng-bind-html='trustMe(myHtml)'></span>",
    controller: function($scope, $element)
    {
      $scope.trustMe = function(html) {
        return $sce.trustAsHtml(html);
      }
    }
  }
}]).
directive('myCenter', ['$timeout', function(timer){
  return {
    link: function(scope, elem, attrs)
    {
      var center = function(){
        elem = angular.element(elem);
        var wrapperHeight = elem.parents('.project-details').height();
        var elemHeight = elem.height();
        console.log("wrapperHeight", wrapperHeight, "elemHeight", elemHeight);
        elem.css({
          position: 'relative',
          top: wrapperHeight/2 - elemHeight/2,
        })
      };
      timer(function(){
        center();
        $(window).on('resize', center);
      }, 10);
    }
  }
}]).
directive('myIsotope', ['$timeout', '$window', function(timer, $window){
  return {
    link: function(scope, elem, attrs)
    {
      if(!Modernizr.touch)
      {
        timer(function(){
          $(elem.isotope({
            itemSelector: "li"
          }))     
        }, 1500);
      }
    },
  };
}]).
directive('myHorizontalScroll', ['$timeout', function(timer){
  return {
    link: function(scope, elem, attrs)
    {
      timer(function() {
        // $('html, body').mousewheel(function(event, delta) {

        //  this.scrollLeft -= (delta * 2);

        //  event.preventDefault();

        // });
    }, 0);
    }
  }
}]).
directive('scrollSpy', function($window, $location) {
  return {
    restrict: 'A',
    controller: function($scope) {
      $scope.spies = [];
      $scope.test = 0;
      setTimeout(function(){console.log('$scope.test changed');$scope.test = 8}, 1000)
      this.addSpy = function(spyObj) {
        $scope.spies.push(spyObj);
      };
    },
    link: function(scope, elem, attrs) {
      var spyElems = [];
      scope.$watch('spies', function(spies) {
        for (var _i = 0; _i < spies.length; _i++) {
          var spy = spies[_i];
          if (spyElems[spy.id] == null) {
            spyElems[spy.id] = (elem.find('#' + spy.id));
          }
        }
      }, true);

      $($window).scroll(function() {
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;

        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();
          spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
          if (spyElems[spy.id].length !== 0) {
            if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= angular.element('#menu').height()) {
              spy.pos = pos;
              if (highlightSpy == null) {
                highlightSpy = spy;
              }
              if (highlightSpy.pos < spy.pos) {
                highlightSpy = spy;
              }
            }
          }
        }
        return highlightSpy != null ? highlightSpy["in"]() : void 0;
      });
    }
  };
}).
directive('spy', function($location) {
  return {
    restrict: "A",
    require: "^scrollSpy",
    link: function(scope, elem, attrs, scrollSpy) {
      if (attrs.spyClass == null) {
        attrs.spyClass = "active";
      }
      elem.click(function() {
        scope.$apply(function() {
          $location.hash(attrs.spy);
        });
      });
      console.log(elem.find('a'));
      scrollSpy.addSpy({
        id: attrs.spy,
        in: function() {
          elem.addClass(attrs.spyClass);
          $location.hash(attrs.spy);

        },
        out: function() {
          elem.removeClass(attrs.spyClass);
        }
      });
    }
  };
});




