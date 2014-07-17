'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */

var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('MainCtrl', function ($scope,$http) {

	$scope.getGitInfo = function () {
	    $http.get('https://api.github.com/repos/'+ $scope.username +'/'+ $scope.reponame +'/issues?client_id=a722b388a41d1580be98&client_secret=7f12c6e3ed9823f7c5fb0c914772b2a6a7ca545d').success(function(issue)
	    {
	      $scope.tasks = issue;
	    }).error(function() {
		$scope.task = {id: 'Virhe'};
	    });
	};

	$scope.getGitAuth = function () {
	   OAuth.initialize('CHkmXQc9pfI3vqPZectNDagrwSc');
	   OAuth.popup('github')
	      .done(function(results) {
		result.get('https://api.github.com/repos/Kilhwch/Ohtu1/issues/1')
		.done(function (response) {
		  console.log(response);
		})
		.fail(function (err) {
		  console.log(err);
		}); 
	      })
	      .fail(function (err) {
		console.log(err);
	      });
	};
  });
  
