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
            var comment = new github.Comment($stateParams.owner, $stateParams.repoName, $scope.issue)
            comment.list({},function(data, response) {
                $scope.comments = data;
            });

            $scope.editissue = angular.copy($scope.issue);

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
                var tmp = angular.copy($scope.issue);
                
                $scope.issue.body = $scope.editissue.body;
                $scope.issue.milestone = $scope.editissue.milestone;
                $scope.issue.labels = $scope.editissue.labels;

                var options = {body :issue.body, labels : issue.labels.name};
                if(issue.milestone) options = {body :issue.body, labels : issue.labels.name, milestone : issue.milestone};
                issues.updateIssue(issue.number, options,function(data,response) {},function(err) {
                    $scope.issue.body = tmp.body;
                    $scope.issue.milestone = tmp.milestone;
                    $scope.issue.labels = tmp.labels;
                });
                issue.editing = false;
                $scope.modalInstance.dismiss('close');
            };
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
            $scope.newComment = function(body) {
                comment.createComment({body : body},function(data,response){
                    $scope.comments.push(data);
                }, function(err){

                });
            };
        });
