'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */

var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('MainCtrl', function ($scope, $state, github) {
	if (!github.isAuthenticated()){
		$state.go('login');
	}else{
		$state.go('list');
	}
  });
  
