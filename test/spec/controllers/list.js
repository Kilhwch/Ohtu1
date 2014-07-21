'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var ListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, github) {
    scope = $rootScope.$new();
    scope.repos = ['repo1', 'repo2', 'repo3'];
    github.loginWithToken(123);
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of repos to the scope', function () {
    expect(scope.repos.length).toBe(3);
  });
});
