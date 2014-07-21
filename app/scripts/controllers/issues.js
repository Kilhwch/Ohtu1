'use strict';
     
var myApp = angular.module('ohtuProjektiAppApp');
     
myApp.controller('IssuesCtrl', function ($scope, $state, github) {
        $scope.issues = new github.Issue('Kilhwch', 'Ohtu1');
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


