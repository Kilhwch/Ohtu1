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
});