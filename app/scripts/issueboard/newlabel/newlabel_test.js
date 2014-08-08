'use strict'

describe('Controller: NewlabelCtrl', function() {
    beforeEach(module('ohtuProjektiAppApp'));
    
    var NewlabelCtrl,
    scope,
    $httpBackend,
    mockModal = {dismiss: function(arg) {}, };
    
    beforeEach(inject(function ($controller, $rootScope, _github_, _$httpBackend_) {
    scope = $rootScope.$new();
    scope.labels = [];
    $httpBackend = _$httpBackend_;
    NewlabelCtrl = $controller('NewissueCtrl', {
      $scope: scope,
      github: _github_,
      $stateParams: {owner: 'user', repoName: 'repo'},
      $modalInstance: mockModal
    });
  }));
  
  it('has a method to dismiss modal window', function() {
    spyOn(mockModal, 'dismiss');
    scope.close();
    expect(mockModal.dismiss).toHaveBeenCalled();
  });

  xit('should receive correct response when creating a new label', function() {
    element(by.id('add')).click();
    element(by.id('New label/Delete label')).click();
    element(by.model('createlabel.name')).sendKeys('label name');
    $('#sendlabel').click();
    var alertDialog = ptor.switchTo().alert();
    alertDialog.accept();
    expect(alertDialog.getText()).toContain("Created label: label name");
});

  xit('should receive correct response when deleting a new label', function() {
    element(by.id('create')).click();
    element(by.css('#create option[value="1"]')).click();
    element(by.css('#delete option[value="0"]')).click();
    $('#deletelabel').click();
    var alertDialog = ptor.switchTo().alert();
    alertDialog.accept();
    expect(alertDialog.getText()).toContain("Deletion of 'Done' is not allowed");
  });
});