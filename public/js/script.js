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

// Detect dark theme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

if (prefersDarkScheme.matches) {
	document.body.classList.add("dark-theme");
} else {
	document.body.classList.remove("dark-theme");
}

(function (){
	function detectDecviceType (){if (window.matchMedia('screen and (min-width: 1170px)').matches) {
		// Desktop
		$('body').addClass('desktop').removeClass('mobile');
	} else {
		// Mobile and Tab
		$('body').addClass('mobile').removeClass('desktop');
	}}
	detectDecviceType();
	$(window).on('resize', function () {
		detectDecviceType();
	})
}());


jQuery(document).ready(function ($) {
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
	$(document).on('click', '.bible__chapters__verses > p', function () {
		$(this).toggleClass('selected');
	});
	$(document).on('click', '.viewport-settings__toggle', function () {
		$('.viewport-settings__dropdown').toggleClass('active');
	});
	$(document).on('click', '[name^=font-size]', function () {
		$(this);
	})
	$(document).on('click', '.menu-icon, body.mobile .chapter__nav__name', function (e) {
		if ($('.menu-icon').hasClass('active')) {
			$('.verse-selection').hide();
			$('.menu-icon').removeClass('active')
		} else {
			$('.menu-icon').addClass('active')
			$('.verse-selection').show();
		}
		e.stopPropagation();
	})

	$.get("/svg/sprite-icons.svg", function (data) {
		var div = document.createElement("SVGicons");
		div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
		document.body.insertBefore(div, document.body.childNodes[0]);
	});
});

function scroll_into_view(id) {
	console.log('id', id);
	var elmnt = document.getElementById(id);
	elmnt.scrollIntoView();
}

function double_scroll(id1, id2) {
	// var id1_parent_st = $([id1 parent]).scrollTop();
	// var id2_parent_st = $([id2 parent]).scrollTop();
	// $([id1 parent]).animate({
	// 	scrollTop: $(id1).position().top + id1_parent_st
	// }, 500, function(){
	// });
	// $([id2 parent]).animate({
	// 	scrollTop: $(id2).position().top + id2_parent_st
	// }, 500, function(){
	// });
}