describe('Controller dilemmaStart', function() {
  beforeEach(module('dilemmaApp'));

  var dilemmaStart,
      scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    dilemmaStart = $controller('dilemmaStart', {
      $scope: scope
    });
  }));

  it('should have a maximum time.', function () {
    expect(scope.dilemmaTime).toEqual(settings.dilemmaTime);
  });
});
