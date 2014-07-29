'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewlabelCtrl
 * @description
 * # NewlabelCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('NewlabelCtrl', function ($scope,github,$stateParams) {
      var labels = new github.Label($stateParams.owner,$stateParams.reponame);
      $scope.createIssue = function() {
          
      };
  });
