'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewissueCtrl
 * @description
 * # NewissueCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('NewissueCtrl', function ($scope, github, $stateParams) {
          var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
          $scope.clearFields = function() {
            $scope.issueTitle = "";
            $scope.issueBody = "";
          }
          $scope.addIssue = function() {
            var d = {title: $scope.issueTitle, body: $scope.issueBody};
            issues.createIssue(d, function(object, response) {
            console.log("issues data", $scope.issues);
            if (response=='201')
              $scope.issues.unshift(object);
            
            });
            $scope.clearFields();
          };
      });
