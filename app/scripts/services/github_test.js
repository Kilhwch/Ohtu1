'use strict';

describe('Service: github', function () {

  // load the service's module
  beforeEach(module('ohtuProjektiAppApp'));

  // instantiate service
  var github,
    $httpBackend,
    httpResult,
    httpError,
    apiUrl = "https://api.github.com";

  function success(data) {
    httpResult = data;
  }

  function error(data) {
    httpError = data;
  }

  beforeEach(inject(function (_github_, _$httpBackend_) {
    github = _github_;
    github.logout();
    $httpBackend = _$httpBackend_;
    httpResult = undefined;
    httpError = undefined;
  }));

  it('should authenticate', function () {
    expect(github.isAuthenticated()).toBe(false);
    github.loginWithToken(123);
    expect(github.isAuthenticated()).toBe(true);
    github.logout();
    expect(github.isAuthenticated()).toBe(false);
  });

  it('should show user', function () {
    $httpBackend.expectGET(/https:\/\/api\.github\.com\/users\/test/).respond(true);
    github.user('test', success);
    expect(httpResult).toBeUndefined();

    $httpBackend.flush();
    expect(httpResult).toBe(true);
  });

  it('should show authenticated user', function () {
    $httpBackend.expectGET(/https:\/\/api\.github\.com\/user/).respond(true);
    github.authenticatedUser(success);
    expect(httpResult).toBeUndefined();

    $httpBackend.flush();
    expect(httpResult).toBe(true);
  });

  it('should show authenticated users github repositories', function () {
    $httpBackend.expectGET(/https:\/\/api\.github\.com\/user\/repos\?cache=\d+/).respond(true);
    github.userRepos(success);
    expect(httpResult).toBeUndefined();

    $httpBackend.flush();
    expect(httpResult).toBe(true);
  });

  it('should be able to add cache param to get request', function () {
    $httpBackend.expectGET(/https:\/\/api\.github\.com\/user\/repos/).respond(true);
    github.userRepos(success);
    expect(httpResult).toBeUndefined();

    $httpBackend.flush();
    expect(httpResult).toBe(true);
  });

  describe('github.Label', function(){
    var labels, user = 'user123', repo = 'repo123';
    var url = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/labels/;
    var urlLabel = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/labels\/label123/;

    beforeEach(function () {
      labels = new github.Label(user, repo);
      httpResult = undefined;
    });

    it('should list all labels', function () {
      $httpBackend.expectGET(url).respond(true);
      labels.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should list specific label', function () {
      $httpBackend.expectGET(urlLabel).respond(true);
      labels.getLabel('label123', success);
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
      $httpBackend.expectPATCH(urlLabel, data).respond(true);
      labels.updateLabel('label123', data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });
	//fix this
    it('should delete a label', function () {
      $httpBackend.expectDELETE(urlLabel).respond(true);
      labels.deleteLabel('label123', success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });


  });

  describe('github.Milestone', function(){
    var milestones, user = 'user123', repo = 'repo123';
    var url = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/milestones/;
    var urlMilestone = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/milestones\/1/;

    beforeEach(function () {
      milestones = new github.Milestone(user, repo);
      httpResult = undefined;
    });

    it('should list all milestones', function () {
      $httpBackend.expectGET(url).respond(true);
      milestones.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should list specific milestone', function () {
      $httpBackend.expectGET(urlMilestone).respond(true);
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
      $httpBackend.expectPATCH(urlMilestone, data).respond(true);
      milestones.updateMilestone(1, data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });
	//fix this
    it('should delete a milestone', function () {
      $httpBackend.expectDELETE(urlMilestone).respond(true);
      milestones.deleteMilestone(1, success);
      expect(httpResult).toBeUndefined();
      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });


  });

  describe('github.Issue', function () {

    var issues, user = 'user123', repo = 'repo123';
    var url = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/issues/;
    var urlIssue = /https:\/\/api\.github\.com\/repos\/user123\/repo123\/issues\/1/;

    beforeEach(function () {
      issues = new github.Issue(user, repo);
      httpResult = undefined;
    });

    it('should list all issues of a repo', function () {
      $httpBackend.expectGET(url).respond(true);
      issues.list({}, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should get a specific issue', function () {
      $httpBackend.expectGET(urlIssue).respond(true);
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
      $httpBackend.expectPATCH(urlIssue, data).respond(true);
      issues.updateIssue(1, data, success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should open an issue', function () {
      var data = {state: "open"};
      $httpBackend.expectPATCH(urlIssue, data).respond(true);
      issues.openIssue(1,success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should close an issue', function () {
      var data = {state: "closed"};
      $httpBackend.expectPATCH(urlIssue, data).respond(true);
      issues.closeIssue(1,success);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpResult).toBe(true);
    });

    it('should call error function', function () {
      $httpBackend.expectGET(/https:\/\/api\.github\.com\/repos\/user123\/repo123\/issues\/2/).respond(401, true);
      issues.getIssue(2,success,error);
      expect(httpResult).toBeUndefined();

      $httpBackend.flush();
      expect(httpError).toBe(true);
    });

  });

});
