'use strict';

describe('Controller: BurndownCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var BurndownCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BurndownCtrl = $controller('BurndownCtrl', {
      $scope: scope
    });
  }));

  it('config labels should be false', function () {
    expect(scope.config.labels).toBe(false);
  });
});
