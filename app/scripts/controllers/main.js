'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */

var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('MainCtrl', function ($scope, $state, gitapi) {
	if (!gitapi.isAuthenticated()){
		$state.go('login');
	}else{
		var git = gitapi.getGithub();
		var user = git.getUser();

		user.repos(function(err, repos){			
			$scope.$apply(function(){
				$scope.repos = repos;
			});
		});
	} 
});
  
