'use strict';

describe('Controller: IssueboardCtrl', function () {

  // load the controller's module
  beforeEach(module('ohtuProjektiAppApp'));
  beforeEach(angular.mock.module('appMock'));

  var IssueboardCtrl, githubMock,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $githubMock) {
    scope = $rootScope.$new();
    scope.issue = {number : 0, editing : true, body : 'body'};
	  githubMock = $githubMock;
    IssueboardCtrl = $controller('IssueboardCtrl', {
      $scope: scope,
  		github : githubMock
    });
    
  }));

  it('should have milestones in scope'), function(){
    except(scope.milestones).not.toBeUndefined();
  };

  it('should have issues in scope'), function(){
    except(scope.issues).not.toBeUndefined();
  };

  it('issue editing should be true', function () {
     scope.editItem(scope.issue);
     expect(scope.issue.editing).toBe(true);
  });

  it('issue editing should be false', function () {
     scope.cancelEditing(scope.issue);
     expect(scope.issue.editing).toBe(false);
  });

  it('issue editing should be false', function () {
     scope.doneEditing(scope.issue);
     expect(scope.issue.editing).toBe(false);
  });

  it("should update issue when calling doneEditing", function(){
    scope.doneEditing(scope.issue, function(data){
      var issues = githubMock.Issues('.','.');
      expect(issues[scope.issue.number].body).toBe('body');
    });   
  });

});
