'use strict';

describe('Service: github', function () {

  // load the service's module
  beforeEach(module('ohtuProjektiAppApp'));

  // instantiate service
  var github, $httpBackend, httpResult, apiUrl = "https://api.github.com";

  function success(data) {
    httpResult = data;
  }
  beforeEach(inject(function (_github_) {
    github = _github_;
  }));

  it('should authenticate whith oginWithToken', function () {
    expect(github.isAuthenticated()).toBe(false);
    github.loginWithToken(123);
    expect(github.isAuthenticated()).toBe(true);
  });


  describe('github.Label', function(){
    var labels, user = 'user123', repo = 'repo123';
    var url = apiUrl + "/repos/" + user + "/" + repo + "/labels";

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      labels = new github.Label(user, repo);
      httpResult = undefined;
    }));

    it('should list all labels', function () {
      $httpBackend.expectGET(url).respond(true);
      labels.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should list specific label', function () {
      $httpBackend.expectGET(url + '/' + 'repo123').respond(true);
      labels.getLabel('repo123', success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should create a label', function () {
      var data = {name: "label1", "color": "FFFFFF"};
      $httpBackend.expectPOST(url, data).respond(true);
      labels.createLabel(data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should update a label', function () {
      var data = {name: "label1", "color": "FFFFFF"};
      $httpBackend.expectPATCH(url + '/' + 'repo123', data).respond(true);
      labels.updateLabel('repo123', data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });
	//fix this
    it('should delete a label', function () {
      $httpBackend.expectDELETE(url + '/' + 1).respond(true);
      labels.deleteLabel(1, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });


  });

  describe('github.Milestone', function(){
    var milestones, user = 'user123', repo = 'repo123';
    var url = apiUrl + "/repos/" + user + "/" + repo + "/milestones";

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      milestones = new github.Milestone(user, repo);
      httpResult = undefined;
    }));

    it('should list all labels', function () {
      $httpBackend.expectGET(url).respond(true);
      milestones.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should list specific milestone', function () {
      $httpBackend.expectGET(url + '/' + 1).respond(true);
      milestones.getMilestone(1, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should create a milestone', function () {
      var data = {title: "milestone1"};
      $httpBackend.expectPOST(url, data).respond(true);
      milestones.createMilestone(data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should update a milestone', function () {
      var data = {title: "milestone1"};
      $httpBackend.expectPATCH(url + '/' + 1, data).respond(true);
      milestones.updateMilestone(1, data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });
	//fix this
    it('should delete a milestone', function () {
      $httpBackend.expectDELETE(url + '/' + 1).respond(true);
      milestones.deleteMilestone(1, success);
      expect(httpResult).toBeUndefined();
      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });


  });

  describe('github.Issue', function () {

    var issues, user = 'user123', repo = 'repo123';
    var url = apiUrl + "/repos/" + user + "/" + repo + "/issues";

    beforeEach(inject(function (_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      issues = new github.Issue(user, repo);
      httpResult = undefined;
    }));

    it('should list all issues of a repo', function () {
      $httpBackend.expectGET(url).respond(true);
      issues.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should get a specific issue', function () {
      $httpBackend.expectGET(url + '/' + 1).respond(true);
      issues.getIssue(1, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should create an issue', function () {
      var data = {title: "issue1"};
      $httpBackend.expectPOST(url, data).respond(true);
      issues.createIssue(data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should update an issue', function () {
      var data = {title: "issue1"};
      $httpBackend.expectPATCH(url + '/' + 1, data).respond(true);
      issues.updateIssue(1, data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should open an issue', function () {
      var data = {state: "open"};
      $httpBackend.expectPATCH(url + '/' + 1, data).respond(true);
      issues.openIssue(1,success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should close an issue', function () {
      var data = {state: "closed"};
      $httpBackend.expectPATCH(url + '/' + 1, data).respond(true);
      issues.closeIssue(1,success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

  });

});
