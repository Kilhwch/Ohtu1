'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboxCtrl
 * @description
 * # IssueboxCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('IssueboxCtrl', function($scope, github, $state,$stateParams, $modalInstance, alertService) {
            var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
            var comment = new github.Comment($stateParams.owner, $stateParams.repoName, $scope.issue)
            comment.list({},function(data, response) {
                $scope.comments = data;
            });
            
            // new comment 'bodya' varten
            $scope.data = {
            body:""
            };

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

            $scope.closeIssue = function(issue){
                var options = [];
                options = {title : issue.title, body : issue.body, labels : issue.labels, milestone : issue.milestone, state: "closed"} ; 
                issues.updateIssue(issue.number, options,function(data,response) {
                    alertService.addAlert('success','Closed issue');
                },function(err) {
                    alertService.addAlert('warning','Issue was not closed');
                });
                for(var i = 0; i < $scope.issues.length; i++){
                    if($scope.issues[i].number == issue.number){
                        $scope.issues.splice(i, 1);
                    }
                }
                $scope.close();
            };

            $scope.doneEditing = function(issue){
                var tmp = angular.copy($scope.issue);
                var newLabels = [];
                
                angular.forEach($scope.issue.labels, function(item) {
                    if(item.name.indexOf("State:")>-1) {
                        newLabels.unshift(item.name);
                        issue.labels.unshift(item);
                    }
                });

                angular.forEach(issue.labels, function(item) {
                    newLabels.push(item.name)
                });

                $scope.issue.title = issue.title;
                $scope.issue.body = issue.body;
                $scope.issue.milestone = issue.milestone;
                $scope.issue.labels = issue.labels;

                var options = []; 
                if(issue.milestone== null) options = {title : issue.title, body : issue.body, labels : newLabels, milestone : ""} ;
                else options = {title : issue.title, body :issue.body, labels : newLabels, milestone : issue.milestone.number};
                
                issues.updateIssue(issue.number, options,function(data,response) {
                    alertService.addAlert('success','Edit succesful');
                },function(err) {
                    $scope.issue.title = tmp.title;
                    $scope.issue.body = tmp.body;
                    $scope.issue.milestone = tmp.milestone;
                    $scope.issue.labels = tmp.labels;
                    alertService.addAlert('warning','Edit unsuccesful');
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
                $scope.data.body = "";
            };
        });
