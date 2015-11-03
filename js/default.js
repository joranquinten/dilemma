var settings = {
	general : {
		debugMode : true
	} ,
	urls : {
		base_url: "http://dilemma.joranquinten.nl/",
		dilemma__cards 	: "../server/dilemma__cards.php",
		dilemma__save 	: "../server/dilemma__save.php",
		dilemma__result : "../server/dilemma__result.php"
	} ,
	dilemmaTime : 20 * 1000
};

if (settings.general.debugMode) settings.urls.base_url = window.location.href.split('#')[0];

var dilemmaApp = angular.module('dilemmaApp', ['ngRoute']);

dilemmaApp.config(['$routeProvider',
	function($routeProvider) {
	    $routeProvider.
				when('/', {
					templateUrl: 'templates/start.html',
					controller: 'dilemmaStart'
				}).
				when('/game/:guid', {
					templateUrl: 'templates/cards.html',
					controller: 'dilemmaGame'
				}).
				when('/game', {
					templateUrl: 'templates/cards.html',
					controller: 'dilemmaGame'
				}).
				when('/result/:guid', {
					templateUrl: 'templates/result.html',
					controller: 'dilemmaResult'
				}).
				when('/quit', {
					templateUrl: 'templates/quit.html',
					controller: 'dilemmaQuit'
				}).
				otherwise({
					templateUrl: 'templates/404.html'
				});
	}]);

dilemmaApp.filter('percentage', ['$filter', function ($filter) {
	  return function (input, decimals) {
	    return $filter('number')(input * 100, decimals) + '%';
	  };
	}]);

dilemmaApp.controller('dilemmaStart', function($scope, $location){
	console.log('dilemmaStart');
	$scope.dilemmaTime = settings.dilemmaTime;
	$scope.newGame = function(){
		$location.path('/game');
	};
});

dilemmaApp.controller('dilemmaGame', function($scope, $location, $http, $routeParams){

		$scope.loadDilemma = function(){

			// (re)set Timer
			$scope.resetTimer();

			// retrieve dilemma
			console.log('loadDilemma');
			var loadUrl = settings.urls.dilemma__cards;
			if ($routeParams.guid !== undefined) loadUrl += '?hash='+ $routeParams.guid;

			$http.get(loadUrl)
				.success(function(response){
					$scope.dilemmas = response.dilemma.items;

					// Set hash
					if ($routeParams.guid === undefined){
						console.log('There is no GUID, set from resource:');
						if (response.dilemma.guid !== ''){ window.location.hash =  window.location.hash +'/'+ response.dilemma.guid;}
					}
					// start the timer on succes!
					$scope.startTimer();
			});
		};

		$scope.saveDilemma = function(chosenID){
			$scope.stopTimer();
			var qs = '?ts='+ Date.now(); //querystring + timestamp
			if (typeof(chosenID) === 'string') 	qs += '&dilemma='+ chosenID;
			if ($routeParams.guid !== undefined) qs += '&hash='+ $routeParams.guid;

			var loadUrl = settings.urls.dilemma__save;

			console.log(loadUrl + qs);

			$http.get(loadUrl + qs)
				.success(function(response){
					if (response.result.success) {
						// successfully saved, show result
						$location.path('/result/'+ $routeParams.guid);
					}
			});
		};

		$scope.quitDilemma = function(){
			console.log('quitDilemma');
			$scope.resetTimer();
			$location.path('/quit');
		};

		// Timing
		var intervalTimer, iCurrentTime = 0, iMaxTime = settings.dilemmaTime;

		$scope.remainingTime = iCurrentTime;
		$scope.totalTime = iMaxTime;

		$scope.startTimer = function(){
			console.log('startTimer');
				intervalTimer = setInterval(function(){
						// Time up!
						if (iCurrentTime >= iMaxTime){
							$scope.stopTimer();
							var timeout = setTimeout(function(){
								console.log('Load new dilemma');
								$scope.loadDilemma();
							},1000);
						} else {
							iCurrentTime += 500;
						}

						$scope.$apply(function() {
			        $scope.remainingTime = iCurrentTime;
			      });
					}, 500
				);

		};

		$scope.stopTimer = function(){
			console.log('stopTimer');
			clearInterval(intervalTimer);
		};

		$scope.resetTimer = function(){
			console.log('resetTimer');
			iCurrentTime = 0;
			$scope.remainingTime = iCurrentTime;
			clearInterval(intervalTimer);
		};

		// Start with a dilemma
		$scope.loadDilemma();
});

dilemmaApp.controller('dilemmaResult', function($scope, $http, $location, $routeParams){

	// retrieve dilemma
	console.log('dilemmaResult');
	var loadUrl = settings.urls.dilemma__result;
	if ($routeParams.guid !== undefined) loadUrl += '?hash='+ $routeParams.guid;

	console.log(loadUrl);

	$http.get(loadUrl)
		.success(function(response){
			$scope.result = response.result.items;
	});

	$scope.newDilemma = function(){
		console.log('newDilemma');
		$location.path('/game');
	};

});

dilemmaApp.controller('dilemmaQuit', function($scope, $location){

	// retrieve dilemma
	console.log('dilemmaQuit');
	$scope.homeScreen = function(){
		console.log('homeScreen');
		$location.path('/');
	};
	$scope.newDilemma = function(){
		console.log('newDilemma');
		$location.path('/game');
	};

});
