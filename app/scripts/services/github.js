'use strict';

/**
 * @ngdoc service
 * @name ohtuProjektiAppApp.github
 * @description
 * # github
 * Service in the ohtuProjektiAppApp.
 */

angular.module('ohtuProjektiAppApp')
  .service('github', ['$http', 'localStorageService',
  function github($http, localStorageService) {

    var apiUrl = 'https://api.github.com';

    function _http(method, url, data, success, error) {
      var options = { method: method, url: apiUrl + url, data: data, cache: false, params: {} };
      var token = localStorageService.get('token');

      if (method === 'GET') {
        options.params.cache = new Date().getTime();
        options.params.per_page = 100;
      }

      if (!!token) {
        options.headers = { 'Authorization': 'token ' + token };
      }

      var promise = $http(options);
 
      if (!!success) {
        if (!!error) {
          promise.success(success).error(error);
        } else {
          promise.success(success);
        }
      } else {
        return promise;
      }
    };

    var githubObject = {
      loginWithToken: function(authtoken) {
        localStorageService.set('token', authtoken);
      },

      logout: function(){
        localStorageService.remove('token');
      },

      isAuthenticated: function(){
        return !!localStorageService.get('token');
      },

      user: function(username, success, error) {
        return _http('GET', '/users/' + username, null, success, error);
      },

      authenticatedUser: function(success, error) {
        return _http('GET', '/user', null, success, error);
      },

      userRepos: function(success, error) {
        return _http('GET', '/user/repos', null, success, error);
      },

      Issue: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/issues';

        // List all issues of a repository
        this.list = function(options, success, error) {
          return _http('GET', url, options || {}, success, error);
        };

        // Gets details for a specific issue
        this.getIssue = function(number, success, error) {
          return _http('GET', url + '/' + number, null, success, error);
        };

        // Create a new issue
        this.createIssue = function(options, success, error) {
          return _http('POST', url, options, success, error);
        };

        // Update an issue
        this.updateIssue = function(number, options, success, error) {
          return _http('PATCH', url + '/' + number, options, success, error);
        };

        // Open an issue
        this.openIssue = function(number, success, error) {
          return _http('PATCH', url + '/' + number, {'state':'open'}, success, error);
        };

        // Close an issue
        this.closeIssue = function(number, success, error) {
          return _http('PATCH', url + '/' + number, {'state':'closed'}, success, error);
        };
      },

      Label: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/labels';

        this.list = function(options, success, error) {
          return _http('GET', url, options || {}, success, error);
        };


        this.getLabel = function(name, success, error) {
          return _http('GET', url + '/' + name, null, success, error);
        };


        this.createLabel = function(options, success, error) {
          return _http('POST', url, options, success, error);
        };
        
        this.deleteLabel = function(name, success, error) {
          return _http('DELETE', url + '/' + name, null, success, error);
        };


        this.updateLabel = function(name, options, success, error) {
          return _http('PATCH', url + '/' + name, options, success, error);
        };

      },

      Milestone: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/milestones';


        this.list = function(options, success, error) {
          return _http('GET', url, options || {}, success, error);
        };

        this.getMilestone = function(number, success, error) {
          return _http('GET', url + '/' + number, null, success, error);
        };


        this.createMilestone = function(options, success, error) {
          return _http('POST', url, options, success, error);
        };


        this.updateMilestone = function(number, options, success, error) {
          return _http('PATCH', url + '/' + number, options, success, error);
        };
        
        this.deleteMilestone = function(number, success, error) {
          return _http('DELETE', url + '/' + number, null, success, error);
        };
      },

      Assignee: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/assignees';


        this.list = function(options, success, error) {
          return _http('GET', url, options || {}, success, error);
        };

        this.checkAssignee = function(assignee, success, error) {
          return _http('GET', url + '/' + assignee, null, success, error);
        };

      },

    };

    return githubObject;
  }]);
