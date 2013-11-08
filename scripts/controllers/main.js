'use strict';

App.Controllers.MainCtrl = function ($scope, $http) {

	$scope.results = [];
	$scope.offset = 0;
	$scope.per_page = 100;

	$http.jsonp('http://www.colourlovers.com/api/palettes/new&jsonCallback=JSON_CALLBACK&showPaletteWidths=1&numResults=1')
	.success(function(data, status, headers, config){
		$scope.palettes = data;
	})

	$scope.reset = function(){
		$scope.results = [];
	}

	$scope.search = function(offset){

		var $picker = $('#color-picker-wrap');
		$picker.css('height','0');
		$picker.data('open',false);

		// if (typeof offset == 'undefined') {
		// 	var offset = 0;
		// 	$scope.results = [];
		// }

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
			$('header').addClass('loading');
			$scope.$apply();
			// q += "&resultOffset=" + offset;
			$http.jsonp('http://www.colourlovers.com/api/palettes&jsonCallback=JSON_CALLBACK&showPaletteWidths=1&numResults=' + $scope.per_page + q)
			.success(function(data, status, headers, config){
				// $scope.results = $scope.results.concat(data);
				$scope.results = data;
				$('header').removeClass('loading');
			})
			.error(function(data, status, headers, config){
				$scope.errors = "Something went wrong";
				$('header').removeClass('loading');
			})
		}

	}


}