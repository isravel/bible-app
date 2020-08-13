// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());

// Place any jQuery/helper plugins in here.
$(document).ready(function ($) {
	$(document).on('click', '.books_list > ul > li', function () {
		$('.books_list > ul > li').removeClass('active');
		$(this).addClass('active');
		let selector = $(this).text();
		console.log(selector);
	});
	$(document).on('click', '.chapters_list > ul > li', function () {
		$('.chapters_list > ul > li').removeClass('active');
		$(this).addClass('active');
		let selector = $(this).text();
		console.log(selector);
	});
	$(document).on('click', '.verses_list > ul > li', function () {
		$('.verses_list > ul > li').removeClass('active');
		$(this).addClass('active');
		let selector = $(this).text();
		console.log(selector);
	});
	$(document).on('click', '.bible__chapters__verses > li', function () {
		$(this).toggleClass('selected');
	});
	$(document).on('click', '.viewport-settings__toggle', function () {
		$('.viewport-settings__dropdown').toggleClass('active');
	});

	// $.get("/svg/sprite-icons.svg", function (data) {
	// 	var div = document.createElement("SVGicons");
	// 	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	// 	document.body.insertBefore(div, document.body.childNodes[0]);
	// });
	$(document).on('click', '[name="font-variant"]', function () {
		let value = $('input[name="font-variant"]:checked').attr('id');
		if (value == 'font-variant-1') {
			$('body').attr('data-font', 'garamond');
		} else if (value == 'font-variant-2') {
			$('body').attr('data-font', 'georgia');
		} else if (value == 'font-variant-3') {
			$('body').attr('data-font', 'nunito');
		} else if (value == 'font-variant-4') {
			$('body').attr('data-font', 'sans');
		} else {
			console.log('invalid font data');
		}
	})
	$(document).on('click', '[name="font-size"]', function () {
		let value = $('input[name="font-size"]:checked').attr('id');
		if (value == 'font-size-14') {
			$('body').attr('data-font-size', '14');
		} else if (value == 'font-size-16') {
			$('body').attr('data-font-size', '16');
		} else if (value == 'font-size-18') {
			$('body').attr('data-font-size', '18');
		} else if (value == 'font-size-20') {
			$('body').attr('data-font-size', '20');
		} else if (value == 'font-size-22') {
			$('body').attr('data-font-size', '22');
		} else {
			console.log('invalid font size data');
		}
	})
	$(document).on('click', '[name="alignment"]', function () {
		let value = $('input[name="alignment"]:checked').attr('id');
		if (value == 'alignment-left') {
			$('body').attr('data-alignment', 'left');
		} else if (value == 'alignment-justify') {
			$('body').attr('data-alignment', 'justify');
		} else if (value == 'alignment-center') {
			$('body').attr('data-alignment', 'center');
		} else {
			console.log('invalid alignment data');
		}
	})
	$(document).on('click', '[name="night-mode"]', function () {
		let value = $('input[name="night-mode"]:checked').attr('id');
		if (value == 'night-mode-1') {
			$('html').removeClass('dark-mode');
		} else if (value == 'night-mode-2') {
			$('html').addClass('dark-mode');
		} else {
			console.log('invalid nightmode data');
		}
	})
	$('.dropdown-el').click(function (e) {
		e.preventDefault();
		e.stopPropagation();
		$(this).toggleClass('expanded');
		$('#' + $(e.target).attr('for')).prop('checked', true);
	});
	$(document).click(function () {
		$('.dropdown-el').removeClass('expanded');
	});
});