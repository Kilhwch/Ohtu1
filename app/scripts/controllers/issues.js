var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('IssuesCtrl', function ($scope, $state, github) {
	if (!gitapi.isAuthenticated()){
		$state.go('login');
	}else{
		var issues = new github.Issue('Kilhwch','Ohtu1');
		issues.list({}, function(error, data) {
		console.log('createIssue');
		if (error)
			console.error(error);
			console.dir(data);
		});
	} 
});
