'use strict';

describe('Controller: NewissueCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var NewissueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewissueCtrl = $controller('NewissueCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    //expect(scope.awesomeThings.length).toBe(3);
  });
});
