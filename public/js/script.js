// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () { };
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
<<<<<<< HEAD
$.get("/svg/sprite-icons.svg", function (data) {
	var div = document.createElement("SVGicons");
	div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
	document.body.insertBefore(div, document.body.childNodes[0]);
});

function scroll_into_view(id) {
	console.log('id', id);
	var elmnt = document.getElementById(id);
	elmnt.scrollIntoView();
}
=======
jQuery(document).ready(function($) {
  $(document).on('click', '.books_list > ul > li', function(){
    $('.books_list > ul > li').removeClass('active');
    $(this).addClass('active');
    let selector = $(this).text();
    console.log(selector);
  });
  $(document).on('click', '.chapters_list > ul > li', function(){
    $('.chapters_list > ul > li').removeClass('active');
    $(this).addClass('active');
    let selector = $(this).text();
    console.log(selector);
  });
  $(document).on('click', '.verses_list > ul > li', function(){
    $('.verses_list > ul > li').removeClass('active');
    $(this).addClass('active');
    let selector = $(this).text();
    console.log(selector);
  });
  $(document).on('click', '.bible__chapters__verses > li', function(){
    $(this).toggleClass('selected');
  });
  $(document).on('click', '.viewport-settings__toggle', function () {
    $('.viewport-settings__dropdown').toggleClass('active');
  });
});
>>>>>>> origin/master
