'use strict';

window.App = angular.module('colourloversClientApp', [])

App.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html',
			controller: 'App.Controllers.MainCtrl'
		})
		.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'App.Controllers.SearchCtrl'
		})
		.when('/palettes/top', {
			templateUrl: 'views/palettes.html',
			controller: 'App.Controllers.PalettesTopCtrl'
		})
		.when('/palettes/new', {
			templateUrl: 'views/palettes.html',
			controller: 'App.Controllers.PalettesNewCtrl'
		})
		.when('/palettes/:palette_id', {
			templateUrl: 'views/palette.html',
			controller: 'App.Controllers.PaletteCtrl'
		})
		.when('/palettes', {
			templateUrl: 'views/palettes.html',
			controller: 'App.Controllers.PalettesCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

// Enable HTML5 history so we can have URLs without hash 
// App.config(function ($locationProvider) {
// 	$locationProvider.html5Mode(true);
// })

// Controllers Namespace
App.Controllers = {}

// App data namespace
App.Data = {}

ZeroClipboard.setDefaults({
	moviePath: '/ZeroClipboard.swf'
});

App.directive('qclip', function(){
	return {
		link: function(scope, el, attrs) {
			var clip = new ZeroClipboard(el);
		}
	}
})

App.directive('qcolor', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$el.parent().toggleClass('active');
				$el.toggleClass('active');
				$el.siblings().removeClass('active');
			})
		}
	}
})

App.directive('qpalette', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$el.toggleClass('active');
			})
		}
	}
})

App.directive('colorpicker', function(){
	return {
		link: function(scope, el, attrs) {

			// http://www.webdesignerdepot.com/2013/03/how-to-create-a-color-picker-with-html5-canvas/

			var canvas = el[0].getContext('2d');

			// create an image object and get it’s source
			var img = new Image();
			img.src = '/images/hsv.png';

			// copy the image to the canvas
			$(img).load(function(){
				canvas.drawImage(img,0,0,1140,400);
			});

			var hex = '';
			var colors = [];

			$(el).on('mousemove', function(event){
				// getting user coordinates
				var x = event.pageX - this.offsetLeft;
				var y = event.pageY - this.offsetTop;
				// getting image data and RGB values
				var img_data = canvas.getImageData(x, y, 1, 1).data;
				var R = img_data[0];
				var G = img_data[1];
				var B = img_data[2];  var rgb = R + ',' + G + ',' + B;
				// convert RGB to HEX
				hex = rgbToHex(R,G,B);
				// making the color the value of the input
				// $('#rgb input').val(rgb);
				// $('#q-hex').val(hex);
				$('header').css('background-color', '#' + hex);
			})

			$(el).on('click', function(event){
				var $preview = $('#color-preview > div');

				if (colors.length == 5)
					colors.splice(0,1);
				colors.push(hex);

				for (var i = 0; i <= colors.length; i++) {
					$preview.eq(i).data('color',colors[i]).css('background-color', '#' + colors[i]);
				}
			})

			// http://www.javascripter.net/faq/rgbtohex.htm
			function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
			function toHex(n) {
				n = parseInt(n,10);
				if (isNaN(n)) return "00";
				n = Math.max(0,Math.min(n,255));
				return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
			}
		}
	}
})

App.directive('pcolor', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$('#q-hex').val($el.data('color'));
			})
		}
	}
})

App.directive('qhex', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$('#color-picker-wrap').css('height','400px');
			})
		}
	}
})

App.directive('search', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('keyup', function(event){
				if (event.which == 13) {
					scope.$parent.search();
					$('#color-picker-wrap').css('height','0');
				}
			})
		}
	}
})