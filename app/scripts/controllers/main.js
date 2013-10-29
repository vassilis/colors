'use strict';

angular.module('colourloversClientApp')
	.controller('MainCtrl', function ($scope, $http) {

		$scope.active = 0;

		$http.jsonp('http://www.colourlovers.com/api/palettes&jsonCallback=JSON_CALLBACK&numResults=100')
		.success(function(data, status, headers, config){
			// console.log(data, status, headers, config);
			$scope.palettes = data;
		})
		.error(function(data, status, headers, config){
			$scope.errors = "Something went wrong";
		})

	})
	.directive('color', function(){
		return {
			link: function(scope, element, attrs) {
				var $el = $(element);
				$el.on('click', function(){
					selectText(this.getElementsByTagName("span")[0]);
				})
			}
		}
	})


function selectText(element) {
		var doc = document;

		if (doc.body.createTextRange) { // ms
				var range = doc.body.createTextRange();
				range.moveToElementText(element);
				range.select();
		} else if (window.getSelection) { // moz, opera, webkit
				var selection = window.getSelection();
				var range = doc.createRange();
				range.selectNodeContents(element);
				selection.removeAllRanges();
				selection.addRange(range);
		}
}