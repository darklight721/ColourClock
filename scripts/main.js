(function($){

	var bodyEl = $('body'),
		pageEl = $('div.clock-pane .pane .page'),
		clockEl = $('.clock', pageEl),
		hexClockEl = $('.hex-clock', pageEl),
		buttonEl = $('div.clock-pane nav button');
	
	function setClock() {
		// get current time
		var time = new Date(),
			hours = time.getHours(),
			minutes = time.getMinutes(),
			seconds = time.getSeconds(),
			// formulate color
			r = getColor(hours, 24),
			g = getColor(minutes, 60),
			b = getColor(seconds, 60);
			
		// set clock
		clockEl.html(
			zeroPrePad(hours) + ':' +
			zeroPrePad(minutes) + ':' + 
			zeroPrePad(seconds)
		);
		
		// set hex clock
		hexClockEl.html(
			zeroPrePad(toHex(r)) + 
			zeroPrePad(toHex(g)) + 
			zeroPrePad(toHex(b))
		);
		
		// set bg color
		bodyEl.css(
			'background-color', 
			'rgb('+ r +','+ g +','+ b +')'
		);
	}
	
	function zeroPrePad(num) {
		num += ''; // make string
		return num.length === 1 ? '0' + num : num;
	}
	
	function getColor(num, div) {
		div = div || 1;
		return Math.floor(num * (255 / div));
	}
	
	function toHex(num) {
		return num.toString(16);
	}
	
	// set clock every 1 sec
	window.setInterval(setClock, 1000);
	
	// attach click event handler to nav buttons
	buttonEl.click(function(){
		var thisEl = $(this);
		
		buttonEl.removeClass('active');
		thisEl.addClass('active');
		
		if (thisEl.attr('id') === 'clock-btn') {
			pageEl.removeClass('scroll-to-hex');
		}
		else {
			pageEl.addClass('scroll-to-hex');
		}
	});
	
})($);