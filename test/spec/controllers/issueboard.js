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
  }));

});
