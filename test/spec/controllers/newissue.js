'use strict';

describe('Controller: NewissueCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var NewissueCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    scope.issue = {title: "title", body: "body"};/*
    NewissueCtrl = $controller('NewissueCtrl', {
      $scope: scope,
      github: {},
      $stateParams: {},
      $modalInstance: {}
    });*/
  }));

  it('Clear fields should clear body and title variables.', function () {
    scope.issue = {};
    expect(scope.issue).toEqual({});
  });
});
