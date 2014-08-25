'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewissueCtrl
 * @description
 * # NewissueCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('NewissueCtrl', function ($state, $scope, github, $stateParams, $modalInstance, alertService) {
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
            //console.log($scope.issue)
            var options = { title:$scope.issue.title,
                            body: $scope.issue.body,
                            assignee: $scope.issue.assignee,
                            labels: $scope.issue.labels};
            if($scope.issue.milestone) {
              options= { title:$scope.issue.title,
                            body: $scope.issue.body,
                            assignee: $scope.issue.assignee,
                            labels: $scope.issue.labels,
                            milestone: $scope.issue.milestone.number};
            }
            issues.createIssue(options).success(function(object, response) {
              if (response=='201')
                $scope.issues.unshift(object);
                alertService.addAlert('success', 'Created issue: '+$scope.issue.title);

            }).error(function(data){
              alertService.addAlert('danger', 'Could not create issue: '+data.message);
            });
            reload();
            $scope.close();
          };

          $scope.close = function(){
            $modalInstance.dismiss('close');
          };

      });
