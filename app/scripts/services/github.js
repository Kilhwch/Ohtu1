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
    return {
      loginWithToken : function(authtoken){
        github = new Github({
          token: authtoken,
          auth: "oauth"
        });
      },
      _http: function(method, url, data, success, error) {
        var obj = $http({method:method, url:url, data:data}).success(success);
        if (error) {
          obj.error(error);
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
          _request("GET", url + "/" + number, null, function(err, pull) {
            if (err) return cb(err);
            cb(null, pull);
          });
        };

      // Create a new issue
      this.createIssue = function(options, cb) {
        _request("POST", url, options, function(err, pull) {
          if (err) return cb(err);
          cb(null, pull);
        });
      };

      // Update an issue
      this.updateIssue = function(number, options, cb) {
        _request("PATCH", url + "/" + number, options, function(err, pull) {
          if (err) return cb(err);
          cb(null, pull);
        });
      };

      // Open an issue
      this.openIssue = function(number, cb) {
        _request("PATCH", url + "/" + number, {"state":"open"}, function(err, pull) {
          if (err) return cb(err);
          cb(null, pull);
        });
      };

      // Close an issue
      this.closeIssue = function(number, cb) {
        _request("PATCH", url + "/" + number, {"state":"closed"}, function(err, pull) {
          if (err) return cb(err);
          cb(null, pull);
        });
      };

    };
    };
  }]);
