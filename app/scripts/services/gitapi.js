'use strict';

/**
 * @ngdoc service
 * @name ohtuProjektiAppApp.gitapiService
 * @description
 * # gitapiService
 * Service in the ohtuProjektiAppApp.
 */
angular.module('ohtuProjektiAppApp')
  .service('gitapi', function gitapi() {
    var github;

    return {
      loginWithToken : function(authtoken){
        github = new Github({
          token: authtoken,
          auth: "oauth"
        });
      },
      isAuthenticated : function(){
        return github != undefined;
      },
      getGithub : function(){
        return github;
      }
    };
  });
