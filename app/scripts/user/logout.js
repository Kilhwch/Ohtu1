'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:LogoutCtrl
 * @description
 * # LogputCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('LogoutCtrl', function(github, $state) {
     github.logout();
     $state.go('main');
  });
