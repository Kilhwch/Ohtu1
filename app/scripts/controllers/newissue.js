'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewissueCtrl
 * @description
 * # NewissueCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('NewissueCtrl', function ($scope,github,$stateParams) {
          $scope.issues = new github.Issue($stateParams.owner, $stateParams.repoName);
          $scope.clearFields = function() {
            $scope.issueTitle = "";
            $scope.issueBody = "";
          }
          $scope.addIssue = function() {
            var d = {title: $scope.issueTitle, body: $scope.issueBody};
            $scope.issues.createIssue(d, function(err, data) {
                if (err)
                  console.log(err);
            });
            $scope.clearFields();
          };
      });
