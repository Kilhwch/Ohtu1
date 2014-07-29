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
      var labels = new github.Label($stateParams.owner,$stateParams.repoName);
      $scope.createLabel = function() {
          var options = {name : $scope.labelName};
          labels.createLabel(options,function(){
          },function(error){
          });
          $scope.labelName="";
      };
  });
