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
	dilemmaTime : 20 * 1000,
	timeupResumeNext: true
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

/*
Controllers
*/
dilemmaApp.controller('dilemmaStart', function($scope, $location){
	$scope.dilemmaTime = settings.dilemmaTime;

	$scope.newGame = function(){
		$location.path('/game');
	};
});

dilemmaApp.controller('dilemmaGame', function($scope, $location, $http, $routeParams){

		$scope.loadDilemma = function(){

			$scope.resetTimer();

			// retrieve a random dilemma, or predefined, if hash exists
			var loadUrl = settings.urls.dilemma__cards;
			if ($routeParams.guid !== undefined) loadUrl += '?hash='+ $routeParams.guid;

			$http.get(loadUrl)
				.success(function(response){
					$scope.dilemmas = response.dilemma.items;
					if ($routeParams.guid === undefined){
						if (response.dilemma.guid !== ''){ window.location.hash =  window.location.hash +'/'+ response.dilemma.guid;}
					}

					$scope.startTimer();
			});
		};

		$scope.saveDilemma = function(chosenID){
			$scope.stopTimer();
			var qs = '?ts='+ Date.now(); // querystring + timestamp
			if (typeof(chosenID) === 'string') 	qs += '&dilemma='+ chosenID;
			if ($routeParams.guid !== undefined) qs += '&hash='+ $routeParams.guid;

			// save the chosen option, return a result
			var loadUrl = settings.urls.dilemma__save;

			$http.get(loadUrl + qs)
				.success(function(response){
					if (response.result.success) {
						$location.path('/result/'+ $routeParams.guid);
					}
			});
		};

		$scope.quitDilemma = function(){
			$scope.resetTimer();
			$location.path('/quit');
		};

		// Timing
		var intervalTimer, iCurrentTime = 0, iMaxTime = settings.dilemmaTime;

		$scope.remainingTime = iCurrentTime;
		$scope.totalTime = (typeof(iMaxTime) === 'number' ? iMaxTime : 20000);


		$scope.startTimer = function(){
			//console.log('startTimer');
				intervalTimer = setInterval(function(){
						// Time up!
						if (iCurrentTime >= iMaxTime){
							$scope.stopTimer();
							var timeout = setTimeout(function(){
								if (settings.timeupResumeNext) $scope.loadDilemma();
							},1000);
						} else {
							iCurrentTime += 500;
						}

						//$scope.$apply(function() {
			        $scope.remainingTime = iCurrentTime;
			    //  });
					}, 500
				);

		};

		$scope.stopTimer = function(){
			//console.log('stopTimer');
			clearInterval(intervalTimer);
		};

		$scope.resetTimer = function(){
			//console.log('resetTimer');
			iCurrentTime = 0;
			$scope.remainingTime = iCurrentTime;
			clearInterval(intervalTimer);
		};

		// Start with a dilemma
		$scope.loadDilemma();
});

dilemmaApp.controller('dilemmaResult', function($scope, $http, $location, $routeParams){

	var loadUrl = settings.urls.dilemma__result;
	if ($routeParams.guid !== undefined) loadUrl += '?hash='+ $routeParams.guid;

	// retrieve result
	$http.get(loadUrl)
		.success(function(response){
			$scope.result = response.result.items;
	});

	$scope.newDilemma = function(){
		$location.path('/game');
	};

});

dilemmaApp.controller('dilemmaQuit', function($scope, $location){

	$scope.homeScreen = function(){
		$location.path('/');
	};
	$scope.newDilemma = function(){
		$location.path('/game');
	};

});
