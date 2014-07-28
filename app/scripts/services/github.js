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
      var options = { method: method, url: apiUrl + url, data: data };
      var token = localStorageService.get('token');

      if (!!token) {
        options.headers = { 'Authorization': 'token ' + token };
      }

      var promise = $http(options).success(success);

      if (error) {
        promise.error(error);
      }
    };

    return {

      loginWithToken: function(authtoken){
        localStorageService.set('token', authtoken);
      },

      logout: function(){
        localStorageService.remove('token');
      },

      isAuthenticated: function(){
        return !!localStorageService.get('token');
      },

      user: function(username, cb) {
        _http('GET', '/users/' + username, null, cb);
      },

      authenticatedUser: function(cb) {
        _http('GET', '/user', null, cb);
      },

      userRepos: function(cb) {
        _http('GET', '/user/repos', null, cb);
      },

      Issue: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/issues';

        // List all issues of a repository
        this.list = function(options, cb) {
          _http('GET', url, options, cb);
        };

        // Gets details for a specific issue
        this.getIssue = function(number, cb) {
          _http('GET', url + '/' + number, null, cb);
        };

        // Create a new issue
        this.createIssue = function(options, cb) {
          _http('POST', url, options, cb);
        };

        // Update an issue
        this.updateIssue = function(number, options, cb) {
          _http('PATCH', url + '/' + number, options, cb);
        };

        // Open an issue
        this.openIssue = function(number, cb) {
          _http('PATCH', url + '/' + number, {'state':'open'}, cb);
        };

        // Close an issue
        this.closeIssue = function(number, cb) {
          _http('PATCH', url + '/' + number, {'state':'closed'}, cb);
        };
      },

      Label: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/labels';

        this.list = function(options, cb) {
          _http('GET', url, options, cb);
        };


        this.getLabel = function(name, cb) {
          _http('GET', url + '/' + name, null, cb);
        };


        this.createLabel = function(options, cb) {
          _http('POST', url, options, cb);
        };
        
        this.deleteLabel = function(name, cb) {
          _http('DELETE', url + '/' + name, null, cb);
        };


        this.updateLabel = function(name, options, cb) {
          _http('PATCH', url + '/' + name, options, cb);
        };

      },

      Milestone: function(user, repo) {
        var url = '/repos/' + user + '/' + repo + '/milestones';


        this.list = function(options, cb) {
          _http('GET', url, options, cb);
        };


        this.getMilestone = function(number, cb) {
          _http('GET', url + '/' + number, null, cb);
        };


        this.createMilestone = function(options, cb) {
          _http('POST', url, options, cb);
        };


        this.updateMilestone = function(number, options, cb) {
          _http('PATCH', url + '/' + number, options, cb);
        };
        
        this.deleteMilestone = function(number, cb) {
          _http('DELETE', url + '/' + number, null, cb);
        };
      },

    };
  }]);
