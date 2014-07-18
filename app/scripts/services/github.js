'use strict';

/**
 * @ngdoc service
 * @name ohtuProjektiAppApp.github
 * @description
 * # github
 * Service in the ohtuProjektiAppApp.
 */
angular.module('ohtuProjektiAppApp')
  .service('github', ['$http', function github($http) {
    var apiUrl = "https://api.github.com";
    var token;
    return {
      loginWithToken : function(authtoken){
          token = authtoken;
      },
      isAuthenticated : function(){
        return token != undefined;
      },
      _http: function(method, url, data, success, error) {
        var promise = $http({method: method, url:apiUrl + url, data:data, headers: 'Authorization: token ' + token}).success(success);
        if (error) {
          promise.error(error);
        }
      },
      Issue: function(options) {
        var url = "/repos/" + options.user + "/" + options.repo + "/issues";

        // List all issues of a repository
        this.list = function(options, cb) {
          _http("GET", url, options, cb);
        };

        // Gets details for a specific issue
        this.getIssue = function(number, cb) {
          _http("GET", url + "/" + number, null, cb);
        };

        // Create a new issue
        this.createIssue = function(options, cb) {
          _http("POST", url, options, cb);
        };

        // Update an issue
        this.updateIssue = function(number, options, cb) {
          _http("PATCH", url + "/" + number, options, cb);
        };

        // Open an issue
        this.openIssue = function(number, cb) {
          _http("PATCH", url + "/" + number, {"state":"open"}, cb);
        };

        // Close an issue
        this.closeIssue = function(number, cb) {
          _http("PATCH", url + "/" + number, {"state":"closed"}, cb);
        };
      }
    };
  }]);
