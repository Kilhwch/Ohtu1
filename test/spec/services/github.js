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
