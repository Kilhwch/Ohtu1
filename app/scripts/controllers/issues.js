'use strict';
     
var myApp = angular.module('ohtuProjektiAppApp');
     
myApp.controller('IssuesCtrl', function ($scope, $stateParams, github) {
        $scope.issues = new github.Issue($stateParams.owner, $stateParams.repoName);
        
        // list issues
        $scope.issues.list({}, function(data) {
        $scope.issues = data;
    });
        // get a specific issue
        
        // koodia
	
	    // create a new issue
	    $scope.addIssue = function() {
	       alert("haloo");
	       var d = {title: $scope.issueTitle, body: "hello world heheh"}; 
	       var options = { method: "POST", url: "https://api.github.com/repos/Kilhwch/Ohtu1/issues", data: d };
	        $scope.issues.createIssue(options, function(data) {
                console.log(data);
            });
	    };
	

});


