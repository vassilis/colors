'use strict';

window.App = angular.module('colourloversClientApp', [
	'ngCookies',
	'ngResource',
	'ngSanitize'
])

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