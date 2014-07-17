'use strict';

/**
 * @ngdoc service
 * @name ohtuProjektiAppApp.auth
 * @description
 * # auth
 * Service in the ohtuProjektiAppApp.
 */
angular.module('ohtuProjektiAppApp')
  .service('auth', function auth() {
    OAuth.initialize('CHkmXQc9pfI3vqPZectNDagrwSc');

    return {
      askAuth : function () {
       return OAuth.popup('github');
      }
    };
  });
