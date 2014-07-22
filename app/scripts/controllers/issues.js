'use strict';
     
var myApp = angular.module('ohtuProjektiAppApp');
     
myApp.controller('IssuesCtrl', function ($scope, $stateParams, github) {
        $scope.issues = new github.Issue($stateParams.owner, $stateParams.repoName);
        // list issues
        $scope.issues.list({}, function(data) {
        $scope.issuet = data;
    });
        // get a specific issue
        
        // koodia
	
	    // create a new issue
	    $scope.addIssue = function() {
         console.log("addIssue kutsuttu");
	       var d = {title: $scope.issueTitle, body: "hello world heheh"}; 
	        $scope.issues.createIssue(d, function(err, data) {
                console.log("createIssue kutsuttu");
                console.log(err);
                console.log(data);
            });
	    };
	

});


