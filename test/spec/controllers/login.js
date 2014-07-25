'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var LoginCtrl,
    scope,
    github = {loginWithToken: function () {} },
    auth;

  function MockAuth() {}
  MockAuth.prototype.askAuth = function () {return this;};
  MockAuth.prototype.done = function (func) {return this;};
  MockAuth.prototype.fail = function (func) {return this;};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($state, $rootScope, $controller) {
    auth = new MockAuth();
    spyOn(auth, 'askAuth').andCallThrough();
    spyOn(auth, 'done').andCallThrough();
    spyOn(auth, 'fail').andCallThrough();
    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', {
      $scope: scope,
      $state: $state,
      github: github,
      auth: auth,
    });

  }));

  it('should call auth.askAuth when $scope.signin is called', function () {
    scope.signin();
    expect(auth.askAuth).toHaveBeenCalled();
    expect(auth.done).toHaveBeenCalled();
    expect(auth.fail).toHaveBeenCalled();
  });

});
