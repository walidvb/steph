var mobileWidth = 769;
angular.module('myApp.directives', []).
directive('fixedMenu', ['$timeout', '$window', function(timer, $window){
  return{
    link: function(scope, elem, attr){
      if(Modernizr.touch)
      {
        angular.element(elem).addClass('navbar-fixed-top');

      }
      else
      {
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
        var menu_height = attrs.myFullscreen ? 0 :angular.element('#menu').height();
        angular.element(elem).height($window.innerHeight-menu_height).css('overflow', 'auto')
      };
      angular.element($window).bind('resize', function()
      {
        setSize();
      });
      timer(setSize, 0);
    }
  }
}]).
directive('mySrc', ['$timeout', '$window', function(timer, $window){
  return function(scope, elem, attrs){

    var $elem = angular.element(elem);
    $elem.hide();
    var img = new Image();
    img.src = attrs.mySrc;
    img.onload = function(){
      $elem.attr('src', attrs.mySrc)
      .fadeIn();
    }
  };
}]).
directive('myBackgroundImg', ['$window', '$timeout', function($window, timer){
  return {
    restrict: 'AE',
    //replace: true,
    link: function(scope, elem, attrs){
      var $elem = angular.element(elem);
      var lazy = function(){
        //LazyLoad
        //using $observe, as using the scope directly would trigger the directive 
        //before the controller had time to fetch its data.
        attrs.$observe('myBackgroundImg', function(){
          var img = new Image();
          img.src = attrs.myBackgroundImg;
          img.onload = function(){
            $elem.css('background-image', "url('" + this.src + "')");
          };
        });
      }
      if(!Modernizr.touch)
      { 

        var parallax = function() {
          //Again, problem is that if top is calculated beforehand, 
          //it is incorrect because DOM hasn't compiled entirely yet...
          var top = $elem.offset().top;
          if((pos = (top-$window.scrollY))-$window.innerHeight <= 0)
          {
            var yPos = pos * 0.15;
            var coords = "50% "+yPos+"px";
            $elem.css("backgroundPosition", coords);
          }
        }
        timer(function(){
          angular.element($window).scroll(parallax);
          parallax();
        }, 0);
      }
      timer(lazy, 0);
    }
  }
}]).
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
    replace: true,
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

        var elem = angular.element(elem);
        console.log(elem);
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
      function isotopeIt() {
        if(angular.element(elem).find(attrs.myIsotope).length)
        {
          angular.element(elem).masonry({
            itemSelector: attrs.myIsotope,
            gutter: 20,
            columnWidth: function( containerWidth ) {
              console.log('containerWidth', containerWidth);
              return containerWidth / 3;
            }
          }).animate({'opacity': 1});
        }
        else
        {
          setTimeout(function(){isotopeIt()}, 100);
        }
      }
      if(!Modernizr.touch && $window.innerWidth > mobileWidth)
      {
        console.log(scope);
       angular.element(elem).css('opacity', 0);
       timer(function(){   
        isotopeIt()
      }, 1000);

     }
   },
 };
}]).
directive('scrollSpy', function($window, $location) {
  return {
    restrict: 'A',
    controller: function($scope) {
      $scope.spies = [];
      this.addSpy = function(spyObj) {
        $scope.spies.push(spyObj);
      };
    },
    link: function(scope, elem, attrs) {
      var spyElems = [];
      scope.$watch('spies', function(spies) {
        for (var i = 0; i < spies.length; i++) {
          var spy = spies[i];
          if (spyElems[spy.id] == null || spyElems[spy.id] !== elem.find('#' + spy.id) ) 
          {
            spyElems[spy.id] = (elem.find('#' + spy.id));
          }
        }
      }, true);

      angular.element($window).scroll(function() {
        var highlightSpy, pos, spy;
        highlightSpy = null;
        for (i = 0; i < scope.spies.length; i++) {
          spy = scope.spies[i];
          spy.out();
          spyElems[spy.id] = spyElems[spy.id].length === 0 ? elem.find('#' + spy.id) : spyElems[spy.id];

          if (spyElems[spy.id].length !== 0) {
            //distinguish between mobile and desktop
            var condition = (Modernizr.touch) ? 
            ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= $window.innerHeight) : 
            ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= angular.element('#menu').height() || pos - $window.scrollY <= $window.innerHeight);//pos + spyElems[spy.id].height() > $window.scrollY)
      if (condition) {
        spy.pos = pos;
        if (highlightSpy == null || highlightSpy.pos < spy.pos) {
          highlightSpy = spy;
        }
      }
    }
  }
  if(highlightSpy != null){
    highlightSpy["in"]();
  };
});
    }
  };
}).
directive('spy', ['$location', function($location) {
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
          $location.hash(attrs.id);
        },
        out: function() {
          elem.removeClass(attrs.spyClass);
        }
      });

    }
  };
}]).
directive('myIframe', ['$timeout', '$window', function(timer, $window){
  return function(scope, elem, attrs) {
    var center = function(){

    };
    var setFull = function() {
      if(!Modernizr.touch)
      {

        var ratio = 1280/720,
        newCss = {},
        maxWidth = $window.innerHeight*ratio;
        if(maxWidth < $window.innerWidth)
        {
          newCss.h = $window.innerHeight;//-angular.element('#menu'),
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
          newCss = {};
        }
        angular.element(elem).find('iframe, img').css(newCss);

      };
    }
    angular.element($window).bind('resize', setFull);
    timer(setFull, 0);
  }
}]);