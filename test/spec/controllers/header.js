'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var HeaderCtrl,
    scope;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $state, github) {
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $scope: scope,
      $location: {},
      github: github,
      $state: $state,
      $stateParams: {}
    });
  }));

  it('shouldn\'t have params', function () {
    expect(scope.params).toEqual({});
  });

  it('shouldn\'t have a current state', function () {
    expect(scope.currentState).toBe('');
  });

  it('shouldn\'t be logged in', function () {
    expect(scope.isLoggedIn).toBe(false);
  });

  it('should attach getClass function', function () {
    expect(scope.getClass('/123', '/123')).toBe('active');
    expect(scope.getClass('/123', '/123/4')).toBe('active');
    expect(scope.getClass('/123', '/123/4/5')).toBe('active');

    expect(scope.getClass('/123', '/124/4/5')).toBe('');
  });
});
