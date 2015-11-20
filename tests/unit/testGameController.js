describe('Controller dilemmaGame', function() {
  beforeEach(module('dilemmaApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    $controller = _$controller_;
  }));

  jasmine.clock().install();

  describe('Timer functions', function(){
      beforeEach(inject(function(){
        $scope = {};
        controller = $controller('dilemmaGame', { $scope: $scope });
      }));

      var settings = { dilemmaTime : 20 * 1000, timeupResumeNext: true };
      var iMaxTime = (typeof(settings.dilemmaTime) === 'number' ? settings.dilemmaTime : 20000);

      it('should set the remaining time to 0 on start', function() {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        expect($scope.remainingTime).toEqual(0);
      });

      it('should count the remaining time', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        jasmine.clock().tick(1000);
        expect($scope.remainingTime).toEqual(1000);
      });

      it('should not exceed the maximum time, but get reset to 0', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        jasmine.clock().tick(settings.dilemmaTime =+ 1);
        expect($scope.remainingTime).toEqual(0);
      });

      it('should not add time when stopped', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        jasmine.clock().tick(1000);
        $scope.stopTimer();
        jasmine.clock().tick(1000);
        expect($scope.remainingTime).toEqual(1000);
      });

      it('should always reset to 0', function () {
        $scope.remainingTime = 1000;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        jasmine.clock().tick(1000);
        $scope.resetTimer();
        expect($scope.remainingTime).toEqual(0);
      });

  });

  describe('Card interactions', function () {

    beforeEach(inject(function(){
      $scope = {};
      controller = $controller('dilemmaGame', { $scope: $scope });
    }));

    var settings = { dilemmaTime : 20 * 1000, timeupResumeNext: true };
    var iMaxTime = (typeof(settings.dilemmaTime) === 'number' ? settings.dilemmaTime : 20000);

    it('should start timer on load success', function () {
      $scope.remainingTime = 0;
      $scope.totalTime = iMaxTime;
      $scope.loadDilemma();
      jasmine.clock().tick(1000);
      $scope.stopTimer();
      expect($scope.remainingTime).toEqual(0);

    });

    it('should stop timer on saving', function () {
      $scope.resetTimer();
      $scope.totalTime = iMaxTime;
      $scope.startTimer();
      jasmine.clock().tick(1000);
      $scope.saveDilemma();
      expect($scope.remainingTime).toEqual(1000);
    });

    it('should reset timer on quitting', function () {
      $scope.resetTimer();
      $scope.startTimer();
      jasmine.clock().tick(1000);
      $scope.quitDilemma();
      expect($scope.remainingTime).toEqual(0);
    });
  });



});

/*

dilemmaApp.controller('dilemmaGame', function($scope, $location, $http, $routeParams){

		$scope.loadDilemma = function(){



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


});

*/
