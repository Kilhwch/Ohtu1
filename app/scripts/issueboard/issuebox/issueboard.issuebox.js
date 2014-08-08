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
            $scope.cancelEditing = function(issue,oldMilestone,oldLabels){
                issue.milestone = oldMilestone;
                issue.labels = oldLabels;
                issue.editing = false;
                $scope.modalInstance.dismiss('close');
            };

            $scope.doneEditing = function(issue,oldMilestone,oldLabels){
                var options = {body :issue.body, milestone : issue.milestone.number, labels : issue.labels};
                var temp = issue.body;
                issues.updateIssue(issue.number, options,function(data,response) {
                    issue = data;
                },function(err) {
                    issue.milestone = oldMilestone;
                    issue.labels = oldLabels
                });
                issue.editing = false;
                $scope.modalInstance.dismiss('close');
            };
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
        });
