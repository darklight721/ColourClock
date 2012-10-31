(function($){

	var bodyEl = $('body'),
		pageEl = $('div.clock-pane .pane .page'),
		clockEl = $('.clock', pageEl),
		hexClockEl = $('.hex-clock', pageEl),
		buttonEl = $('div.clock-pane nav button');
	
	// this is the main fn that sets the time; gets called every 1 sec.
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
	
	// prefixes 0 to single digits
	function zeroPrePad(num) {
		num += ''; // convert to string
		return num.length === 1 ? '0' + num : num;
	}
	
	function getColor(num, div) {
		div = div || 1;
		return Math.floor(255 / div * num);
	}
	
	function toHex(num) {
		return num.toString(16);
	}
	
	// set clock every 1 sec
	window.setInterval(setClock, 1000);
	
	// attach event to nav buttons to toggle between clock and hex clock
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

	// fullscreen toggle codes below
	var body = bodyEl[0],
		fsToggleEl = $('#fullscreen-toggle');

	// normalize fullscreen api's
	if (body.webkitRequestFullScreen) {
		body.requestFullScreen = body.webkitRequestFullScreen;
		document.cancelFullScreen = document.webkitCancelFullScreen;
	}
	else if (body.mozRequestFullScreen) {
		body.requestFullScreen = body.mozRequestFullScreen;
		document.cancelFullScreen = document.mozCancelFullScreen;
	}

	function isFullScreen() {
		return  document.fullScreenElement ? true :
				document.webkitIsFullScreen ? true :
				document.mozFullScreenElement ? true :
				false;
	}

	// show toggle button only when fullscreen is supported
	if (body.requestFullScreen) {
		fsToggleEl.show();
	}

	// toggle fullscreen
	fsToggleEl.click(function(){
		if (isFullScreen()) {
			document.cancelFullScreen();
		}
		else {
			body.requestFullScreen();
		}
	});

	$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(){
		if (isFullScreen()) {
			fsToggleEl.addClass('reverse');
		}
		else {
			fsToggleEl.removeClass('reverse');
		}
	});
	
})($);