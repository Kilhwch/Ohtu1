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

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
