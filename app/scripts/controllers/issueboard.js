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

    $scope.milestones = milestones;
    $scope.milestones.list({}, function(data) {
        $scope.milestones = data;
        console.log(data);
    });

    issues.list({}, function(data) {
        data.editing = false;
        $scope.issues = data;
    });

    $scope.editItem = function(issue){
        issue.editing = true;
    };

    $scope.cancelEditing = function(issue){
        issue.editing = false;
    };

    $scope.doneEditing = function(issue){
        issues.updateIssue(issue.number, issue, function(data){});
        issue.editing = false;
    };
  });
