'use strict';
     
var myApp = angular.module('ohtuProjektiAppApp');
     
myApp.controller('IssuesCtrl', function ($scope, $stateParams, github) {
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


