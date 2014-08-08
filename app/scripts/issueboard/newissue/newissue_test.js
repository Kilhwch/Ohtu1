'use strict';

describe('Controller: NewissueCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var NewissueCtrl,
    scope,
    $httpBackend,
    mockModal = {dismiss: function(arg) {}, };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _github_, _$httpBackend_) {
    scope = $rootScope.$new();
    scope.issues = [];
    $httpBackend = _$httpBackend_;
    NewissueCtrl = $controller('NewissueCtrl', {
      $scope: scope,
      github: _github_,
      $stateParams: {owner: 'user', repoName: 'repo'},
      $modalInstance: mockModal
    });
  }));

  it('has a close method that dismisses the modal', function () {
    spyOn(mockModal, 'dismiss');
    scope.close();
    expect(mockModal.dismiss).toHaveBeenCalled();
  });

  xit('should receive correct response when creating a new issue', function() {
  element(by.id('add')).click();
  element(by.id('New issue')).click();
  element(by.model('issue.title')).sendKeys('issue title');
  element(by.model('issue.body')).sendKeys('issue body');
  $('#create-issue').click();
  var alertDialog = ptor.switchTo().alert();
  alertDialog.accept();
  expect(alertDialog.getText()).toContain("Created issue: issue title");
});

});
