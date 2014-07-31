'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewissueCtrl
 * @description
 * # NewissueCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('NewissueCtrl', function ($state, $scope, github, $stateParams, $modalInstance) {
          var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
          var reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
          $scope.issue = {};
          $scope.addIssue = function() {
            issues.createIssue($scope.issue).success(function(object, response) {
              if (response=='201')
                $scope.issues.unshift(object);
                alert("Created issue: "+$scope.issue.title);
            });
            reload();
            $scope.close();
          };

          $scope.close = function(){
            $modalInstance.dismiss('close');
          };

      });
