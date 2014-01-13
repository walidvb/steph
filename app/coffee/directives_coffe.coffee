angular.module "myApp.directives", []
.directive("scrollSpy", ["$timeout", (timer) ->
  {}
]).
directive("fixedMenu", ["$timeout", (timer) ->
  link: (scope, elem, attr) ->
    console.log elem
    fixIt = (e) ->
      menu_pos = $(elem).offset().top
      menu_height = $(elem).height()
      oldPadding = $("body").css("paddingTop")
      lastPos = $(window).scrollTop()
      timeout = undefined
      fixMenu = (e) ->
        pos = $(window).scrollTop()
        lastPos = $(window).scrollTop()
        scrollingDown = e.originalEvent.detail > 0 or e.originalEvent.wheelDelta < 0
        console.log scrollingDown
        if pos >= menu_pos
          $(elem).addClass "navbar-fixed-top"
          $("body").css "paddingTop", menu_height
          if scrollingDown
            newTop = Math.min(menu_height, lastPos - pos)
            $(elem).css top: "+=" + 1
        else
          $(elem).removeClass "navbar-fixed-top"
          $("body").css "paddingTop", oldPadding

      $(window).on("scroll", (e) ->
        fixMenu e
      ).on "resize", (e) ->
        menu_pos = $(elem).offset().top
        menu_height = $(elem).outerHeight(true)
        oldPadding = $("body").css("paddingTop")
        fixMenu e


    timer fixIt, 0
]).
directive("myFullscreen", ["$timeout", (timer) ->
  (scope, elem, attrs) ->
    unless Modernizr.touch
      setSize = ->
        $(elem).height($(window).height()).css "overflow", "auto"

      $(window).on "resize", ->
        setSize()

      timer setSize, 0
]).
directive("myBackgroundImg", ->
  restrict: "AE"
  templateUrl: "partials/backgrounds.html"
  scope:
    background: "=backgroundProps"
    test: "="
).
directive("mySlide", ->
  restrict: "AE"
  templateUrl: "partials/slide.html"
  scope:
    slide: "=mySlides"
).
directive("myHtml", ["$timeout", "$sce", (timer, $sce) ->
  scope:
    myHtml: "="

  template: "<span ng-bind-html='trustMe(myHtml)'></span>"
  controller: ($scope, $element) ->
    $scope.trustMe = (html) ->
      $sce.trustAsHtml html
]).
directive("myCenter", ["$timeout", (timer) ->
  link: (scope, elem, attrs) ->
    center = ->
      wrapperHeight = $(elem).parents("section").height()
      elemHeight = $(elem).height()
      $(elem).css
        position: "relative"
        top: wrapperHeight / 2 - elemHeight / 2


    timer (->
      center()
      $(window).on "resize", center
    ), 10
]).
directive "myIsotope", ["$timeout", (timer) ->
  link: (scope, elem, attrs) ->
    timer (->
      $ elem.isotope(itemSelector: "li")
    ), 0
]