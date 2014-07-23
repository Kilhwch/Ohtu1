'use strict';

describe('Controller: IssueboardCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));
  beforeEach(angular.mock.module('appMock'));

  var IssueboardCtrl, githubMock,
    scope, issue;

  // Initialize the controller and a mock scope
  beforeEach(function(){
    issue = {number : 0, editing : true};
    inject(function ($controller, $rootScope, $githubMock) {
      scope = $rootScope.$new();
      githubMock = $githubMock;
      IssueboardCtrl = $controller('IssueboardCtrl', {
        $scope: scope,
        github : githubMock
      });
    });
  });

  it("should set issue's editing state to false when calling cancelEditing", function(){
    scope.cancelEditing(issue);
    expect(issue.editing).toBe(false);
  });

  it("should set issue's editing state to false when calling doneEditing", function(){
    scope.doneEditing(issue);
    expect(issue.editing).toBe(false);
  });

  it("should update issue when calling doneEditing", function(){
    issue.body = 'body';
    scope.doneEditing(issue, function(data){
      var issues = githubMock.Issues('.','.');
      expect(issues[issue.number].body).toBe('body');
    });   
  });

});
