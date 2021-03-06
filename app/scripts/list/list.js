'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('ListCtrl', function ($scope, $state, github, alertService) {
    if (!github.isAuthenticated()) $state.go('main');
    github.userRepos().success(function(data) {
      $scope.repos = data;
    });
    $scope.repoExists = function() {
    	github.repositoryExists($scope.owner, $scope.repo)
    	.success(function(data) {
    		if (data) {
    			$state.go('repository', {'owner' : $scope.owner, 'repoName' : $scope.repo});
    		}
    	}).error(function(data) {
            alertService.addAlert('danger', data.message);
    	});
    }
  });
