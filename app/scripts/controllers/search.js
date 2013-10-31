'use strict';

App.Controllers.SearchCtrl = function ($scope, $http) {

	$scope.results = [];
	$scope.offset = 0;
	$scope.per_page = 20;
	
	$scope.search = function(offset){
		if (typeof offset == 'undefined') var offset = 0;
		$scope.offset += $scope.per_page;

		// var opts = {
		// 	lines: 10, // The number of lines to draw
		// 	length: 20, // The length of each line
		// 	width: 10, // The line thickness
		// 	radius: 30, // The radius of the inner circle
		// 	corners: 0, // Corner roundness (0..1)
		// 	rotate: 0, // The rotation offset
		// 	direction: 1, // 1: clockwise, -1: counterclockwise
		// 	color: '#FFF', // #rgb or #rrggbb or array of colors
		// 	speed: 1, // Rounds per second
		// 	trail: 60, // Afterglow percentage
		// 	shadow: false, // Whether to render a shadow
		// 	hwaccel: false, // Whether to use hardware acceleration
		// 	className: 'spinner', // The CSS class to assign to the spinner
		// 	zIndex: 2e9, // The z-index (defaults to 2000000000)
		// 	top: 'auto', // Top position relative to parent in px
		// 	left: 'auto' // Left position relative to parent in px
		// };
		// var target = document.body;
		// var spinner = new Spinner(opts).spin(target);

		var q = '';
		$scope.results_length = '';
		
		var q_lover = $.trim($('#q-lover').val());
		if (q_lover.length) q += "&lover=" + q_lover;

		var q_hue = $.trim($('#q-hue').val());
		if (q_hue.length) q += "&hueOption=" + q_hue;

		var q_keywords = $.trim($('#q-keywords').val());
		if (q_keywords.length) q += "&keywords=" + q_keywords;

		var q_order = $('#q-order').val();
		q += "&orderCol=" + q_order;

		q += "&resultOffset=" + offset;

		$http.jsonp('http://www.colourlovers.com/api/palettes&jsonCallback=JSON_CALLBACK&showPaletteWidths=1&numResults=' + $scope.per_page + q)
		.success(function(data, status, headers, config){
			// spinner.stop();
			$scope.q = q;
			$scope.results = $scope.results.concat(data);
			$scope.results_length = data.length;
		})
		.error(function(data, status, headers, config){
			spinner.stop();
			$scope.errors = "Something went wrong";
		})
	}

}


App.directive('qcolor', function(){
	return {
		link: function(scope, el, attrs) {
			var $el = $(el);
			$el.on('click', function(event){
				$el.toggleClass('active');
				$el.siblings().removeClass('active');
			})
		}
	}
})

App.directive('qclip', function(){
	return {
		link: function(scope, el, attrs) {
			var clip = new ZeroClipboard(el);
		}
	}
})