'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboxCtrl
 * @description
 * # IssueboxCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('IssueboxCtrl', function($scope, github, $state,$stateParams, $modalInstance) {
            var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
            var reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.cancelEditing = function(issue){
                issue.editing = false;
                $scope.modalInstance.dismiss('close');
            };

            $scope.doneEditing = function(issue){
                var temp = issue.body;
                issues.updateIssue(issue.number, {body:issue.body}).error(function(data){
                    issue.body = temp;
                });
                issue.editing = false;
                $scope.modalInstance.dismiss('close');
            };
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
        });
