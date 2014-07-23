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
            console.log("addIssue kutsuttu");
            var d = {title: $scope.issueTitle, body: $scope.issueBody};
            $scope.issues.createIssue(d, function(err, data) {
                console.log("createIssue kutsuttu");
                console.log(err);
                console.log(data);

            });
            $scope.clearFields();
          };
      });
