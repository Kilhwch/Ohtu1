'use strict';

/**
 * @ngdoc overview
 * @name ohtuProjektiAppApp
 * @description
 * # ohtuProjektiAppApp
 *
 * Main module of the application.
 */
angular
  .module('ohtuProjektiAppApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider   
      .state('header', {
		templateUrl: 'views/header.html'
      })
      .state('footer', {
		templateUrl: 'views/footer.html'
      })
      .state('home', {
      	abstract:true, 
      	url: '/',
		controller: function($scope, $state){
			$state.go('main');
		}
      })
      .state('main', {
      	url: '/main',		
		views: {
			'': {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
			},
			'header@': {
				templateUrl: 'views/header.html'
			}
		}
      })
      .state('login', {
      	url: '/login',		
		views: {
			'': {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl',
			},
			'header@': {
				templateUrl: 'views/header.html'
			}
		}
      });
  });
