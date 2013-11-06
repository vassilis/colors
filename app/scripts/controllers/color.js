'use strict';

App.Controllers.ColorCtrl = function ($scope, $http) {

	var Color = net.brehaut.Color;

	$scope.reset = function(){
		$scope.results = [];
		$scope.color = Color('#000000');
	}

	$scope.search = function(){

		var hex = $.trim($('#q-hex').val());
		if (hex.charAt(0) != "#")
			hex ="#" + hex;

		if (hex != "#") {

			var $picker = $('#color-picker-wrap');
			$picker.css('height','0');
			$picker.data('open',false);

			var color = Color(hex);
			$scope.color = color;

			$('header').removeClass('lightness').css('background-color', hex);
			if (color.getLightness() > 0.5) {
				$('header').addClass('lightness');
			}

			$scope.results = [
				{ title: "Complementary", colors: color.complementaryScheme() },
				{ title: "Split Complementary", colors: color.splitComplementaryScheme() },
				{ title: "Split Complementary CW", colors: color.splitComplementaryCWScheme() },
				{ title: "Split Complementary CCW", colors: color.splitComplementaryCCWScheme() },
				{ title: "Triadic", colors: color.triadicScheme() },
				{ title: "Clash", colors: color.clashScheme() },
				{ title: "Tetradic", colors: color.tetradicScheme() },
				{ title: "Four Tone CW", colors: color.fourToneCWScheme() },
				{ title: "Four Tone CCW", colors: color.fourToneCCWScheme() },
				{ title: "Five Tone A", colors: color.fiveToneAScheme() },
				{ title: "Five Tone B", colors: color.fiveToneBScheme() },
				{ title: "Five Tone C", colors: color.fiveToneCScheme() },
				{ title: "Five Tone D", colors: color.fiveToneDScheme() },
				{ title: "Five Tone E", colors: color.fiveToneEScheme() },
				{ title: "Six Tone CW", colors: color.sixToneCWScheme() },
				{ title: "Six Tone CCW", colors: color.sixToneCCWScheme() },
				{ title: "Neutral", colors: color.neutralScheme() },
				{ title: "Analogous", colors: color.analogousScheme() }
			]

		}

	}

	$scope.$on('search', function(evt) {
		$scope.search();
	});

	// $scope.$on('saturation', function(evt, newvalue) {
	// 	$scope.color = $scope.color.setSaturation(newvalue);
	// });

	// $scope.$on('value', function(evt, newvalue) {
	// 	$scope.color = $scope.color.setValue(newvalue);
	// });

	// $scope.$on('lightness', function(evt, newvalue) {
	// 	$scope.color = $scope.color.setLightness(newvalue);
	// });

	// $scope.$on('alpha', function(evt, newvalue) {
	// 	$scope.color = $scope.color.setAlpha(newvalue);
	// });

}