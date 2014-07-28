'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function ($scope, $stateParams, github) {

    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    var milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    $scope.labels = ["Ready","InProgress","Done"];

    milestones.list({}, function(data) {
        $scope.milestones = data;
    });

    issues.list({}, function(data) {
        data.editing = false;
        $scope.issues = data;
    });

    $scope.editItem = function(issue){
        issue.editingbody = issue.body;
        issue.editing = true;
    };

    $scope.cancelEditing = function(issue){
        issue.editing = false;
    };

    $scope.doneEditing = function(issue){
        issue.body = issue.editingbody;
        issues.updateIssue(issue.number, issue, function(data){});
        issue.editing = false;
    };
    
    $scope.changedMilestone = function(issue){
        $scope.doneEditing(issue);
        milestones.getMilestone(issue.milestone,function(data){
            issue.milestone = data;
        });
    };

    $scope.getLabelColor = function(issue){
      return (issue.labels.length === 0)? "": "#" + issue.labels[0].color;
    };
  });