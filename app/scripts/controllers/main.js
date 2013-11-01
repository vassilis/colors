'use strict';

App.Controllers.MainCtrl = function ($scope, $http) {

	$scope.results = [];
	$scope.offset = 0;
	$scope.per_page = 100;

	$http.jsonp('http://www.colourlovers.com/api/palettes/new&jsonCallback=JSON_CALLBACK&showPaletteWidths=1&numResults=3')
	.success(function(data, status, headers, config){
		$scope.palettes = data;
	})

	$scope.reset = function(){
		$scope.results = [];
	}

	$scope.search = function(offset){

		if (typeof offset == 'undefined') {
			var offset = 0;
			$scope.results = [];
		}

		$scope.offset += $scope.per_page;

		var q = '';
		
		// var q_lover = $.trim($('#q-lover').val());
		// if (q_lover.length) q += "&lover=" + q_lover;

		// var q_hue = $.trim($('#q-hue').val());
		// if (q_hue.length) q += "&hueOption=" + q_hue;

		var q_hex = $.trim($('#q-hex').val());
		if (q_hex.length) q += "&hex=" + q_hex;

		var q_keywords = $.trim($('#q-keywords').val());
		if (q_keywords.length) q += "&keywords=" + q_keywords;

		// var q_order = $('#q-order').val();
		// q += "&orderCol=" + q_order;

		if (q == '') {
			$scope.results = [];
			$scope.$apply();
		} else {
			q += "&resultOffset=" + offset;
			$http.jsonp('http://www.colourlovers.com/api/palettes&jsonCallback=JSON_CALLBACK&showPaletteWidths=1&numResults=' + $scope.per_page + q)
			.success(function(data, status, headers, config){
				$scope.results = $scope.results.concat(data);
			})
			.error(function(data, status, headers, config){
				$scope.errors = "Something went wrong";
			})
		}

	}


}

App.directive('search', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('keyup', function(event){
				if (event.which == 13) {
					scope.$parent.search();
				}
			})
		}
	}
})