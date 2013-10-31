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