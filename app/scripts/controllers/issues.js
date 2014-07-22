'use strict';

var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('IssuesCtrl', function($scope, $stateParams, github) {
    $scope.milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    $scope.milestones.list({}, function(data) {
        $scope.milestones = data;
        console.log(data);
    });
    $scope.milestones.list({}, function(error, data) {
        console.log('createMilestone');
        if (error)
            console.error(error);
        console.dir(data);
    });

    $scope.issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    $scope.issues.list({}, function(data) {
        $scope.issues = data;
    });
    $scope.issues.list({}, function(error, data) {
        console.log('createIssue');
        if (error)
            console.error(error);
        console.dir(data);
    });
});


