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
    scope.issueBody = "body";
    scope.issueTitle = "title";
  }));

  it('Clear fields should clear body and title variables.', function () {
    scope.clearFields();
    expect(scope.issueBody).toBe("");
    expect(scope.issueTitle).toBe("");
  });
});
