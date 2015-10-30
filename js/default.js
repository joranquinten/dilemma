var settings = {
	general : {
		debugMode : true
	} ,
	urls : {
		base_url: "http://dilemma.joranquinten.nl/",
		dilemma__cards : "../server/dilemma__cards.php",
		dilemma__result : "../server/dilemma__result.php"
	} ,
	dilemmaTime : 5 * 1000
};

settings.urls.base_url = 'http://localhost:3000/dilemma/public/';


var dilemmaApp = angular.module('dilemmaApp', ['ngRoute']);

dilemmaApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'templates/start.html',
			controller: 'dilemmaStart'
		}).
		when('/game', {
			templateUrl: 'templates/cards.html',
			controller: 'dilemmaGame'
		}).
		when('/result', {
			templateUrl: 'templates/result.html',
			controller: 'dilemmaResult'
		}).
		when('/quit', {
			templateUrl: 'templates/quit.html'
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
	$scope.newGame = function(){
		$location.path('/game');
	};
});

dilemmaApp.controller('dilemmaGame', function($scope, $location){

		$scope.loadDilemma = function(){

			// (re)set Timer
			$scope.resetTimer();

			// retrieve dilemma
			console.log('loadDilemma');
			var loadUrl = settings.urls.dilemma__cards;
			if (window.location.hash !== '') loadUrl += '?hash='+ window.location.hash.slice(1);
			console.log(loadUrl);

			// start the timer on succes!
			$scope.startTimer();

		};

		$scope.saveDilemma = function(){
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
						console.log(iCurrentTime);
						$scope.$apply(function() {
			        $scope.remainingTime = iCurrentTime;
			      });

						// Move indicator
						var percentage = (parseFloat(iCurrentTime/iMaxTime).toFixed(2)*100).toFixed(2);
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

		$scope.loadDilemma();
});

dilemmaApp.controller('dilemmaResult', function($scope){

});

dilemmaApp.controller('dilemmaController', function($scope){
	// Start me up!
});

/*


function loadDilemma(){
	var request = new XMLHttpRequest();

	var loadUrl = settings.urls.dilemma__cards;
	if (window.location.hash !== '') loadUrl += '?hash='+ window.location.hash.slice(1);

	request.open('GET', loadUrl, true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		console.log('JSON loaded');
		var r = JSON.parse(request.responseText);
		var t = Handlebars.compile(document.getElementById('dilemma-cards').innerHTML);
		console.log(r);
		var collection = r.dilemma.items;
		var output = t({dilemma:collection});
		document.getElementById('dilemma__loader').innerHTML = output;

		var timeout = setTimeout(function(){startTimer(document.querySelector('.dilemma__gauge__fill'));}, 1000);

		// Set hash
		if (r.dilemma.guid !== ''){ window.location.hash = '#'+ r.dilemma.guid;}

		// Add interaction
		var cards = document.querySelectorAll('.dilemma__card');
		for (var i=0; i < cards.length; i++){
			cards[i].addEventListener('click', function(e) {
				e.preventDefault();
				[].map.call(document.querySelectorAll('.dilemma__card--active'), function(el) {
                el.classList.remove('dilemma__card--active');
            });
            this.classList.add('dilemma__card--active');
				var dilemmaID;
				if (typeof(this.getAttribute('data-dilemma-id')) === 'string') {
					dilemmaID = this.getAttribute('data-dilemma-id');
					console.log('Chosen ID: '+ dilemmaID);
				}
				saveDilemma(dilemmaID);
			});
		}
		var button__quit = document.querySelector('#button__quitDilemma');
		button__quit.addEventListener('click', function(){
			stopTimer();
			location.href = settings.urls.base_url;
		}, false);
	  } else {
		console.log('Error loading '+ loadUrl);
	  }
	};
	request.onerror = function() {
	  console.log('Connection error');
	};
	request.send();
}

function saveDilemma(chosenID){
	// End timer
	stopTimer();

	// Make the save call
	console.log('saving...');

	// Show result (on callback or timeout)
	var request = new XMLHttpRequest();
	var loadUrl = settings.urls.dilemma__result;
	var qs = '?ts='+ Date.now();

	if (typeof(chosenID) === 'string') 	qs += '&dilemma='+ chosenID;
	if (window.location.hash !== '') 	qs += '&hash='+ window.location.hash.slice(1);


	request.open('GET', loadUrl + qs, true);
	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
		console.log('JSON loaded');
		var r = JSON.parse(request.responseText);
		var t = Handlebars.compile(document.getElementById('dilemma-result').innerHTML);
		console.log(r);
		var collection = r.result.items;
		var output = t({result:collection});
		document.getElementById('dilemma__loader').innerHTML = output;
		dilemmaControls();
	  } else {
		console.log('Error loading '+ settings.urls.dilemma__result);
	  }
	};
	request.onerror = function() {
	  console.log('Connection error');
	};
	request.send();
}

function dilemmaControls(){
	 var button__start = document.querySelector('#button__newDilemma');
	 button__start.addEventListener('click', function(){

		// Remove info
		var info = document.querySelectorAll('.dilemma__info');
			Array.prototype.forEach.call(info, function(el, i){
			if (el.classList){
				el.classList.add('bounceOut');
			} else {
				el.className += ' ' + 'bounceOut';
			}
		});
		window.location.hash = '';
		loadDilemma();
	 }, false);
}

// Make a class out of this!
var intervalTimer, iCurrentTime = 0, iMaxTime = settings.dilemmaTime;
function startTimer(elGauge){
	intervalTimer = setInterval(function(){
			iCurrentTime += 500;

			// Move indicator
			var percentage = (parseFloat(iCurrentTime/iMaxTime).toFixed(2)*100).toFixed(2);
			elGauge.style.width = percentage+'%';

			// Time up!
			if (iCurrentTime >= iMaxTime){
				elGauge.style.width = '100%';
				stopTimer();
				var timeout = setTimeout(function(){loadDilemma();},1000);
			}
		}, 500
	);
}
function stopTimer(){
	iCurrentTime = 0;
	clearInterval(intervalTimer);
}
function resetTimer(){
	iCurrentTime = 0;
	clearInterval(intervalTimer);
	gauge.style.width = '0%';
}

document.addEventListener("DOMContentLoaded", function() {
 console.log('DOMContentLoaded');
 dilemmaControls();
 if (window.location.hash !== '') loadDilemma();
});

*/
