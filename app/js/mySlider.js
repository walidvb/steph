(function($){
	$.fn.mySlider = function(options)
	{
		var $this = $(this);
		var timer, lastSL, wrapper;
		var slides = [];
		var defaults = {
			slideSelector: '.slide',
			wrapperClass: 'slider-wrap',
		}

		options = $.extend({}, defaults, options);
		var init = function() {
			var sliderHeight = options.height || $this.outerWidth(true);
			$this.wrap("<div class=\"" + options.wrapperClass + "\" style=\"overflow-x: auto;height:100%;\"></div>");
			wrapper = $('.'+options.wrapperClass);
			var width = 10;
			$(options.slideSelector, $this).each(function(i){
				slides.push({
					elem: $(this),
					index: i,
					scrollLeft: width,
				});
				width += $(this).outerWidth(true);
			});
			$this.width(width);
			console.log(slides);
		};

		var goTo = function(slideIndex){
			$this.scrollLeft(slides[slideIndex].scrollLeft);
			console.log(slides[slideIndex].scrollLeft);
		};

		var _getClosest = function(goal){
			var closest = null;
			$.each(slides, function(){
				var thisScroll = wrapper.scrollLeft;
				if (closest == null || Math.abs(this - goal) < Math.abs(closest - goal)) {
					closest = this;
				}
			});
			return closest.index;
		}

		var attachEvents = function(){
			$(this).on('scroll', function(e)
			{
				var sL = wrapper.scrollLeft();
				if(sL > lastSL)
				{
					lastSL++;
				}
				else{
					lastSL--;
				}
				console.log(e);
				clearTimeout(timer);
				var targetIndex = _getClosest($(this).scrollLeft(), 'left');
				timer = setTimeout(goTo(targetIndex), 500);
				wrapper.scrollLeft(lastSL);
			});
		};

		init();
		//attachEvents();
		return $this;
	}

})(jQuery)