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
  .module('ohtuProjektiAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
    $stateProvider   
      .state('header', {
		templateUrl: 'views/header.html'
      })
      .state('footer', {
		templateUrl: 'views/footer.html'
      })
      .state('main', {
      	url: '/main',		
		views: {
			'': {
				templateUrl: 'views/issueboard.html',
				controller: 'IssueboardCtrl',
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
      })
      .state('list', {
      	url: '/list',		
		views: {
			'': {
				templateUrl: 'views/list.html',
				controller: 'ListCtrl',
			},
			'header@': {
				templateUrl: 'views/header.html'
			}
		}
      })
      .state('repository', {
      	url: '/repos/:repoName',		
		views: {
			'': {
        templateUrl: 'views/repository.html',
				controller: function($stateParams, $scope) {
          $scope.repoName = $stateParams.repoName;
        },
        resolve: {
          repoName: ['$stateParams', function($stateParams) {
            return $stateParams.repoName;
          }]
        }
				//controller: 'ListCtrl',
			},
			'header@': {
				templateUrl: 'views/header.html'
			}
		}
      });

  });
