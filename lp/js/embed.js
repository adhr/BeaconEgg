if (!window.VINE_EMBEDS) {
	window.VINE_EMBEDS = true;
	window.VINE_DEBUG = [];

	function hasClass(element, className) {
		return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	}

	function addClass(element, className) {
		if (!this.hasClass(element, className)) element.className += " " + className;
	}

	function removeClass(element, className) {
		if (hasClass(element, className)) {
	    	var regex = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(regex, ' ');
		}
	}

	window.setInterval(function () {
		var embeds = document.querySelectorAll('iframe[src*="vine.co"]');
		for (var i = 0; i < embeds.length; i++) {

			if (hasClass(embeds[i], 'loaded')) {

				var topPosition = embeds[i].getBoundingClientRect().top;
				if (topPosition > -300 && topPosition < document.documentElement.clientHeight) {
					if (!hasClass(embeds[i], 'playing')) {
						window.VINE_DEBUG.push(embeds[i].src + ' entered screen');
						addClass(embeds[i], 'playing');
						embeds[i].contentWindow.postMessage('play', '*');
					}
				} else {
					if (hasClass(embeds[i], 'playing')) {
						removeClass(embeds[i], 'playing');
						embeds[i].contentWindow.postMessage('pause', '*');
					}
				}
			}

		}
	}, 100);

	var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
	var listenForEvent = window[eventMethod];
	var eventName = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

	listenForEvent(eventName, function (event) {
		var e = event.data.split('::');
		window.VINE_DEBUG.push(event.data);
		if (e[0] == 'height') {
			var embeds = document.querySelectorAll('iframe[src="' + e[1] + '"]');
			for (var i = 0; i < embeds.length; i++) {
				newHeight = parseInt(e[2]);
				if (embeds[i].style.removeProperty) {
					embeds[i].style.removeProperty('height');
				} else {
					embeds[i].style.removeAttribute('height');
				}
				embeds[i].height = newHeight * 1;
			}
		} else if (e[0] == 'unmute') {
			var embeds = document.querySelectorAll('iframe[src="' + e[1] + '"]');
			var target = null;
			for (var i = 0; i < embeds.length; i++) {
				target = embeds[i];
				addClass(embeds[i], 'unmuted');
			}
			var embeds = document.querySelectorAll('iframe.unmuted');
			for (var i = 0; i < embeds.length; i++) {
				if (embeds[i] != target) {
					removeClass(embeds[i], 'unmuted');
					embeds[i].contentWindow.postMessage('mute', '*');
				}
			}
		} else if (e[0] == 'loaded') {
			var embeds = document.querySelectorAll('iframe[src="' + e[1] + '"]');
			for (var i = 0; i < embeds.length; i++) {
				embeds[i].setAttribute('frameborder', 0);
				addClass(embeds[i], 'loaded');
			}
		}
	});
}