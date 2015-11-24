describe('Controller dilemmaGame', function() {
  beforeEach(module('dilemmaApp'));

  var $controller,
      $interval,
      $timeout,
      $httpBackend;

  beforeEach(inject(function(_$controller_, _$interval_,_$timeout_,_$httpBackend_){
    $controller = _$controller_;
    $interval = _$interval_;
    $timeout = _$timeout_;
    $httpBackend = _$httpBackend_;
  }));

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
  var iMaxTime = (typeof(settings.dilemmaTime) === 'number' ? settings.dilemmaTime : 20000);

  describe('Timer functions', function(){
      beforeEach(inject(function(){
        $scope = {};
        controller = $controller('dilemmaGame', { $scope: $scope });
        $httpBackend.expectGET(settings.urls.dilemma__cards).respond(200);
      }));

      it('should set the remaining time to 0 on start', function() {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        expect($scope.remainingTime).toEqual(0);
      });

      it('should count the remaining time', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        $interval.flush(500);
        expect($scope.remainingTime).toEqual(500);
      });

      it('should not exceed the maximum time, but get reset to 0', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        $interval.flush(settings.dilemmaTime =+ 1);
        expect($scope.remainingTime).toEqual(0);
      });

      it('should not add time when stopped', function () {
        $scope.remainingTime = 0;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        $interval.flush(1000);
        $scope.stopTimer();
        $interval.flush(1000);
        expect($scope.remainingTime).toEqual(1000);
      });

      it('should always reset to 0', function () {
        $scope.remainingTime = 1000;
        $scope.totalTime = iMaxTime;
        $scope.startTimer();
        $interval.flush(1000);
        $scope.resetTimer();
        expect($scope.remainingTime).toEqual(0);
      });

  });

  describe('Card interactions', function () {

    beforeEach(inject(function(){
      $scope = {};
      controller = $controller('dilemmaGame', { $scope: $scope });
      $httpBackend.expectGET(settings.urls.dilemma__cards).respond(200);
    }));

    var iMaxTime = (typeof(settings.dilemmaTime) === 'number' ? settings.dilemmaTime : 20000);

    it('should have no items loaded initially', function(){
      expect($scope.dilemmas).toBe(null);
    });

    it('should start timer on load success', function () {
      $scope.remainingTime = 0;
      $scope.totalTime = iMaxTime;
      $scope.loadDilemma();
      $interval.flush(1000);
      $scope.stopTimer();
      expect($scope.remainingTime).toEqual(0);

    });

    it('should stop timer on saving', function () {
      $scope.resetTimer();
      $scope.totalTime = iMaxTime;
      $scope.startTimer();
      $interval.flush(1000);
      $scope.saveDilemma();
      expect($scope.remainingTime).toEqual(1000);
    });

    it('should reset timer on quitting', function () {
      $scope.resetTimer();
      $scope.startTimer();
      $interval.flush(1000);
      $scope.quitDilemma();
      expect($scope.remainingTime).toEqual(0);
    });
  });



});
