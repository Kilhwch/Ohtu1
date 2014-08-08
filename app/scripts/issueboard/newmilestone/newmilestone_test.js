'use strict';

describe('Controller: NewmilestoneCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));

  var NewmilestoneCtrl,
    scope,
    $httpBackend,
    milestone = {title: 'title', description: 'description', due_on: 'due_on'},
    mockModal = {dismiss: function(arg) {}},
    mockState = {transitionTo: function(arg1, arg2, arg3) {}, current: 'currentState'},
    mockStateParams = {owner: 'user', repoName: 'repo'};

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _github_, _$httpBackend_) {
    scope = $rootScope.$new();
    scope.issues = [];
    $httpBackend = _$httpBackend_;
    NewmilestoneCtrl = $controller('NewmilestoneCtrl', {
      $scope: scope,
      github: _github_,
      $state: mockState,
      $stateParams: mockStateParams,
      $modalInstance: mockModal
    });
  }));

  it('has a close method that dismisses the modal', function () {
    spyOn(mockModal, 'dismiss');
    scope.close();
    expect(mockModal.dismiss).toHaveBeenCalledWith('close');
  });

  it('has a reload method', function () {
    spyOn(mockState, 'transitionTo');
    scope.reload();
    expect(mockState.transitionTo)
      .toHaveBeenCalledWith('currentState',
      mockStateParams, { reload: true, inherit: false, notify: true });
  });

  it('has a createMilestone method', function () {
    spyOn(scope.milestones, 'createMilestone');
    scope.createMilestone(milestone);
    expect(scope.milestones.createMilestone).toHaveBeenCalled();
  });

});
