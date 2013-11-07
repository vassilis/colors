'use strict';

window.App = angular.module('colourloversClientApp', [])

App.config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/color.html',
			controller: 'App.Controllers.ColorCtrl'
		})
		.when('/colors/:hex', {
			templateUrl: 'views/color.html',
			controller: 'App.Controllers.ColorCtrl'
		})
		.when('/lovers', {
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

App.directive('colorpicker', function($location){
	return {
		link: function(scope, el, attrs) {

			var $el = $(el);

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
					close_picker();
					$('#q-hex').val(hex);
					$location.path("colors/" + hex);
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
})

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

App.directive('qhex', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('keyup', function(event){
				if (event.which == 13) {
					scope.$apply(function() {
						scope.$broadcast('search', true);
					});
				}
			})
		}
	}
})

App.directive('search', function($rootScope){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('keyup', function(event){
				if (event.which == 13) {
					scope.$apply(function() {
						scope.$broadcast('search', true);
					});
				}
			})
		}
	}
})

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

App.directive('qhue', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.noUiSlider({
				range: [0, 360],
				start: (typeof scope.color != 'undefined') ? scope.color.getHue() : 360,
				handles: 1,
				slide: function(){
					scope.$apply(function() {
						scope.color = scope.color.setHue($el.val());
					})
				}
			}).change(function(){
				close_picker();
				var hex = scope.color.setHue($el.val()).toCSS().substr(1);
				$location.path("colors/" + hex);
				// $('#q-hex').val(hex);
				// scope.$broadcast('search', true);
				// scope.$broadcast('saturation', $el.val());
				setTimeout(function(){scope.$apply();}, 10);
			});
			// scope.$watch('color', function(newVal) {
			// 	var val = (typeof scope.color != 'undefined') ? scope.color.getHue() : 1;
			// 	$el.val(val);
			// });
		}
	}
})

App.directive('qsaturation', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.noUiSlider({
				range: [0, 1],
				start: (typeof scope.color != 'undefined') ? scope.color.getSaturation() : 1,
				handles: 1,
				slide: function(){
					scope.$apply(function() {
						scope.color = scope.color.setSaturation($el.val());
					})
				}
			}).change(function(){
				close_picker();
				var hex = scope.color.setSaturation($el.val()).toCSS().substr(1);
				$location.path("colors/" + hex);
				// $('#q-hex').val(hex);
				// scope.$broadcast('search', true);
				// scope.$broadcast('saturation', $el.val());
				setTimeout(function(){scope.$apply();}, 10);
			});
			// scope.$watch('color', function(newVal) {
			// 	var val = (typeof scope.color != 'undefined') ? scope.color.getSaturation() : 1;
			// 	$el.val(val);
			// });
		}
	}
})

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

App.directive('qlightness', function($location){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.noUiSlider({
				range: [0, 1],
				start: (typeof scope.color != 'undefined') ? scope.color.getLightness() : 1,
				handles: 1,
				slide: function(){
					scope.$apply(function() {
						scope.color = scope.color.setLightness($el.val());
					})
				}
			}).change(function(){
				close_picker();
				var hex = scope.color.setLightness($el.val()).toCSS().substr(1);
				$location.path("colors/" + hex);
				// $('#q-hex').val(hex);
				// scope.$broadcast('search', true);
				// scope.$broadcast('lightness', $el.val());
				setTimeout(function(){scope.$apply();}, 10);
			});
			// scope.$watch('color', function(newVal) {
			// 	var val = (typeof scope.color != 'undefined') ? scope.color.getLightness() : 1;
			// 	$el.val(val);
			// });
		}
	}
})

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

window.close_picker = function() {
	var $picker = $('#color-picker-wrap');
	$picker.css('height','0');
	$picker.data('open',false);
}