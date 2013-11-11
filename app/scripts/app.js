'use strict';

window.App = angular.module('colourloversClientApp', [])

App.config(function ($routeProvider) {
	$routeProvider
		// .when('/', {
		// 	templateUrl: 'views/color.html',
		// 	controller: 'App.Controllers.ColorCtrl'
		// })
		.when('/:hex', {
			templateUrl: 'views/color.html',
			controller: 'App.Controllers.ColorCtrl'
		})
		// .when('/lovers', {
		// 	templateUrl: 'views/main.html',
		// 	controller: 'App.Controllers.MainCtrl'
		// })
		// .when('/search', {
		// 	templateUrl: 'views/search.html',
		// 	controller: 'App.Controllers.SearchCtrl'
		// })
		// .when('/palettes/top', {
		// 	templateUrl: 'views/palettes.html',
		// 	controller: 'App.Controllers.PalettesTopCtrl'
		// })
		// .when('/palettes/new', {
		// 	templateUrl: 'views/palettes.html',
		// 	controller: 'App.Controllers.PalettesNewCtrl'
		// })
		// .when('/palettes/:palette_id', {
		// 	templateUrl: 'views/palette.html',
		// 	controller: 'App.Controllers.PaletteCtrl'
		// })
		// .when('/palettes', {
		// 	templateUrl: 'views/palettes.html',
		// 	controller: 'App.Controllers.PalettesCtrl'
		// })
		.otherwise({
			redirectTo: '/EB4C4C'
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
	moviePath: 'ZeroClipboard.swf'
});

App.directive('qclip', function(){
	return {
		link: function(scope, el, attrs) {
			var clip = new ZeroClipboard(el);
		}
	}
})

// App.directive('qcolor', function(){
// 	return {
// 		link: function(scope, el, attrs) {
// 			var $el = $(el);
// 			$el.on('click', function(event){
// 				$el.parent().toggleClass('active');
// 				$el.toggleClass('active');
// 				$el.siblings().removeClass('active');
// 			})
// 		}
// 	}
// })

App.directive('qpalette', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$el.toggleClass('active');
				$el.removeClass('fade');
				$el.siblings().removeClass('active');
				if ($el.hasClass('active')) {
					$el.siblings().addClass('fade');
					setTimeout(function(){
						$el.animatescroll({scrollSpeed:1000,easing:'easeOutBounce'});
					}, 500);
				} else {
					$el.siblings().removeClass('fade');
				}
			})
		}
	}
})

// App.directive('activeheader', function(){
// 	return {
// 		link: function(scope, el, attrs) {

// 			var $el = $(el);
// 			var $sliders = $('.sliders', $el);

// 			$el.on('mouseenter', function(){
// 				$sliders.addClass('active');
// 			})
// 			$el.on('mouseleave', function(){
// 				$sliders.removeClass('active');
// 			})
// 		}
// 	}
// })

App.directive('colorpicker', ['$location', function($location){
	return {
		link: function(scope, el, attrs) {

			var $el = $(el);
			var Color = net.brehaut.Color;

			// http://www.webdesignerdepot.com/2013/03/how-to-create-a-color-picker-with-html5-canvas/

			var canvas = el[0].getContext('2d');

			// create an image object and get it’s source
			var img = new Image();
			img.src = 'images/hsv.png';

			var w = $el.parent().width();
			var h = 400;
			$el.attr('width', w);
			$el.attr('height', h);

			// copy the image to the canvas
			$(img).load(function(){
				canvas.drawImage(img,0,0,w,h);
			});

			$(window).resize(function(){
				var w = $el.parent().width();
				$el.attr('width', w);
				$el.attr('height', h);
				canvas.drawImage(img,0,0,w,h);
			})

			var hex = '';
			var colors = [];

			$el.on('mousemove', function(event){
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
				$('.icon-droplet').css('color','#' + hex);
				$('header').css('background-color','#' + hex);
				// var light = Color('#' + hex).getLightness();
				// $('#btn-drop').css('background-color', "rgba(200, 200, 200, " + (0.2 - light.toFixed(2)) + ")");
			})

			$el.on('mouseout', function(event){
				scope.$broadcast('search', true);
			})

			$el.on('click', function(event){
				// var $preview = $('#color-preview > div');

				// if (colors.length == 5)
				// 	colors.splice(0,1);
				// colors.push(hex);

				// for (var i = 0; i <= colors.length; i++) {
				// 	$preview.eq(i).data('color',colors[i]).css('background-color', '#' + colors[i]);
				// }
				scope.$apply(function() {
					closePicker();
					$('#q-hex').val(hex);
					$location.path("/" + hex);
					// scope.$broadcast('search', true);
				})
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
}])

App.directive('pcolor', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$('#q-hex').val($el.data('color'));
				// if ($el.html() == '') {
				// 	$el.html('<i class="icon-checkmark"></i>');
				// } else {
				// 	$el.html('');
				// }
			})
		}
	}
})

App.directive('qhex', ['$location', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('keyup', function(event){
				if (event.which == 13) {
					scope.$apply(function() {
						var hex = $.trim($el.val())
						if (hex.charAt(0) == "#") hex = hex.substr(1);
						if (hex.length == 6) $location.path("/" + hex);
					});
				}
			})
		}
	}
}])

// App.directive('search', function($rootScope){
// 	return {
// 		link: function(scope, el, attrs) {
// 			var $el = $(el);
// 			$el.on('keyup', function(event){
// 				if (event.which == 13) {
// 					scope.$apply(function() {
// 						scope.$broadcast('search', true);
// 					});
// 				}
// 			})
// 		}
// 	}
// })

App.directive('droplet', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			var $picker = $('#color-picker-wrap');
			$el.on('click', function(event){
				if ($picker.data('open')) {
					$picker.css('height','0');
					$picker.data('open',false);
					scope.$apply(function() {
						scope.$broadcast('search', true);
					})
				} else {
					$picker.css('height','400px');
					$picker.data('open',true);
				}
			})
		}
	}
})

App.directive('qhue', ['$location', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.slider({
				min: 0,
				max: 360,
				step: 1,
				value: (typeof scope.color != 'undefined') ? scope.color.getHue() : 1,
				slide: function(){
					scope.color = scope.color.setHue($el.slider("value"));
					scope.$apply();
				},
				change: function() {
					closePicker();
					var hex = scope.color.setHue($el.slider("value")).toCSS().substr(1);
					$location.path("/" + hex);
					setTimeout(function(){scope.$apply();}, 10);
				}
			});
		}
	}
}])

App.directive('qsaturation', ['$location', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.slider({
				min: 0,
				max: 1,
				step: 0.01,
				value: (typeof scope.color != 'undefined') ? scope.color.getSaturation() : 1,
				slide: function(){
					scope.color = scope.color.setSaturation($el.slider("value"));
					scope.$apply();
				},
				change: function() {
					closePicker();
					var hex = scope.color.setSaturation($el.slider("value")).toCSS().substr(1);
					$location.path("/" + hex);
					setTimeout(function(){scope.$apply();}, 10);
				}
			});
		}
	}
}])

// App.directive('qvalue', function(){
// 	return {
// 		link: function(scope, el, attrs) {
// 			var $el = $(el);
// 			$el.noUiSlider({
// 				range: [0, 1],
// 				start: (typeof scope.color != 'undefined') ? scope.color.getValue() : 1,
// 				handles: 1,
// 			}).change(function(){
// 				scope.$apply(function() {
// 					$('#q-hex').val(scope.color.setValue($el.val()).toCSS());
// 					scope.$broadcast('search', true);
// 					// scope.$broadcast('value', $el.val());
// 				});
// 			});
// 			scope.$watch('color', function(newVal) {
// 				var val = (typeof scope.color != 'undefined') ? scope.color.getValue() : 1;
// 				$el.val(val);
// 			});
// 		}
// 	}
// })

App.directive('qlightness', ['$location', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.slider({
				min: 0,
				max: 1,
				step: 0.01,
				value: (typeof scope.color != 'undefined') ? scope.color.getLightness() : 1,
				slide: function(){
					scope.color = scope.color.setLightness($el.slider("value"));
					scope.$apply();
				},
				change: function() {
					closePicker();
					var hex = scope.color.setLightness($el.slider("value")).toCSS().substr(1);
					$location.path("/" + hex);
					setTimeout(function(){scope.$apply();}, 10);
				}
			});
		}
	}
}])

// App.directive('qalpha', function(){
// 	return {
// 		link: function(scope, el, attrs) {
// 			var $el = $(el);
// 			$el.noUiSlider({
// 				range: [0, 1],
// 				start: (typeof scope.color != 'undefined') ? scope.color.getAlpha() : 1,
// 				handles: 1,
// 			}).change(function(){
// 				scope.$apply(function() {
// 					// $('#q-hex').val(scope.color.setAlpha($el.val()).toCSSHex());
// 					scope.$broadcast('search', true);
// 					scope.$broadcast('alpha', $el.val());
// 				});
// 			});
// 			scope.$watch('color', function(newVal) {
// 				var val = (typeof scope.color != 'undefined') ? scope.color.getAlpha() : 1;
// 				$el.val(val);
// 			});	
// 		}
// 	}
// })

window.closePicker = function() {
	var $picker = $('#color-picker-wrap');
	$picker.css('height','0');
	$picker.data('open',false);
}

$.fn.resizeToParent = function(w,h){
	var $el = $(this);
	var w = $el.parent().width();
	var canvas = el[0].getContext('2d');
	$el.attr('width', w);
	$el.attr('height', h);
}