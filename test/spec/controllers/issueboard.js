'use strict';

describe('Controller: IssueboardCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var IssueboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IssueboardCtrl = $controller('IssueboardCtrl', {
      $scope: scope
    });
    scope.issue = {}
    scope.issue.number = 1;
    scope.issue.body = "";
  }));

  it('issue editing should be true', function () {
     scope.editItem(scope.issue);
     expect(scope.issue.editing).toBe(true);
  });
  it('issue editing should be false', function () {
     scope.cancelEditing(scope.issue);
     expect(scope.issue.editing).toBe(false);
  });
  it('issue editing should be false', function () {
     scope.doneEditing(scope.issue);
     expect(scope.issue.editing).toBe(false);
  });



});
