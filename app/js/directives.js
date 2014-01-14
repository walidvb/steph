angular.module('myApp.directives', []).
directive('fixedMenu', ['$timeout', '$window', function(timer, $window){
  return{
    link: function(scope, elem, attr){
      var fixIt = function(e){
        var menu_pos = $window.innerHeight;//angular.element(elem).offset().top;
        var menu_height = angular.element(elem).height();
        var oldPadding = angular.element('body').css('paddingTop');

        var timeout;
        var fixMenu = function(e){

          var pos = $window.scrollY;
          if( pos >= menu_pos)
          {
            angular.element(elem).addClass('navbar-fixed-top');
            angular.element('body').css('paddingTop', menu_height);
          }
          else
          {
            angular.element(elem).removeClass('navbar-fixed-top');
            angular.element('body').css('paddingTop', oldPadding);
          }
        }
        angular.element($window).bind('scroll', function(e)
        {
          fixMenu(e);
        }).
        on('resize', function(e){
          menu_pos = angular.element(elem).offset().top;
          menu_height = angular.element(elem).outerHeight(true);
          oldPadding = angular.element('body').css('paddingTop');
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
directive('myFullscreen', ['$timeout', '$window', function(timer, $window){
  return function(scope, elem, attrs){
    if(!Modernizr.touch)
    {
      var setSize = function() {
        angular.element(elem).height($window.innerHeight).css('overflow', 'auto')
      };
      angular.element($window).bind('resize', function()
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
directive('myCenter', ['$timeout', '$window', function(timer, $window){
  return {
    link: function(scope, elem, attrs)
    {
      var center = function(){
        elem = angular.element(elem);
        var wrapperHeight = elem.parents('.project-details, #contact').height();
        var elemHeight = elem.height();
        elem.css({
          position: 'relative',
          top: wrapperHeight/2 - elemHeight/2,
        })
      };
      timer(function(){
        center();
        angular.element($window).bind('resize', center);
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
          $(elem.masonry({
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
      this.addSpy = function(spyObj) {
        $scope.spies.push(spyObj);
      };
    },
    link: function(scope, elem, attrs) {
      var spyElems = [];
      scope.$watch('spies', function(spies) {
        console.log('added spy');
        for (var _i = 0; _i < spies.length; _i++) {
          var spy = spies[_i];
          console.log('spyElem changed!', spyElems[spy.id] !== elem.find('#' + spy.id) );
          if (spyElems[spy.id] == null || spyElems[spy.id] !== elem.find('#' + spy.id) ) 
          {
            spyElems[spy.id] = (elem.find('#' + spy.id));
          }
        }
      }, true);

      angular.element($window).scroll(function() {
        var highlightSpy, pos, spy, _i, _len, _ref;
        highlightSpy = null;
        _ref = scope.spies;
        console.log('spies', _ref);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          spy = _ref[_i];
          spy.out();
          spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];
          if (spyElems[spy.id].length !== 0) {
            if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= $window.innerHeight) {
              spy.pos = pos;
              if (highlightSpy == null || highlightSpy.pos < spy.pos) {
                highlightSpy = spy;
              }
            }
          }
        }
        console.log("highlightedSpy: ", highlightSpy);
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

        });
      });
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
}).
directive('myIframe', ['$timeout', '$window', function(timer, $window){
  return function(scope, elem, attrs) {
    var setFull = function() {
      if(!Modernizr.touch)
      {
        var ratio = 1280/720,
        newCss = {},
        maxWidth = $window.innerHeight*ratio;
        if(!Modernizr.touch && maxWidth < $window.innerWidth)
        {
          newCss.h = $window.innerHeight,
          newCss.w = newCss.h*ratio;
        }
        else
        {
          newCss.w = $window.innerWidth;
          newCss.h = newCss.w/ratio;
        }
        if(attrs.myIframe == 'html')
        {
          newCss = {
            minWidth: newCss.w,
            minHeight: newCss.h,
          };
        }
        else{
          newCss = {
            maxWidth: newCss.w,
            maxHeight: newCss.h,
          };
        }
        angular.element(elem).find('iframe, img').css(newCss);
      };
      angular.element($window).bind('resize', setFull);
      timer(setFull, 0);
    }
  }
}]);




