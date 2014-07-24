'use strict';

describe('Controller: LogoutCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var LogoutCtrl,
    scope;
  var github = {logout : function () {} };

  // Initialize the controller and a mock scope
  beforeEach(inject(function (github, $state, $rootScope, $controller) {
    scope = $rootScope.$new();
    LogoutCtrl = $controller('LogoutCtrl', {
      $scope: scope,
      $location: {},
      github: github,
      $state: $state,
    });
  }));

  it('github logout should have been called', function () {
    spyOn(github, 'logout');
    github.logout();
    expect(github.logout).toHaveBeenCalled();
  });

});
