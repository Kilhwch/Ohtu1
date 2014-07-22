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
    'LocalStorageModule',
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
				controller: 'IssuesCtrl',
			},
			'header@': {
				controller: 'HeaderCtrl',
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
				controller: 'HeaderCtrl',
				templateUrl: 'views/header.html'
			}
		}
      })
      .state('logout', {
        url: '/logout',
                views: {
                        '': {
                                templateUrl: 'views/logout.html',
                                controller: 'LogoutCtrl',
                        },
                        'header@': {
				controller: 'HeaderCtrl',
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
				controller: 'HeaderCtrl',
				templateUrl: 'views/header.html'
			}
		}
      })
      .state('repository', {
      	url: '/repos/:owner/:repoName',		
		views: {
			'': {
        templateUrl: 'views/issueboard.html',
				controller: 'IssuesCtrl',
			},
			'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'views/header.html'
			}
		}
      })
      .state('burndown', {
      	url: '/repos/:owner/:repoName/burndown',		
	    	views: {
			    '': {
          templateUrl: 'views/burndown.html',
				  controller: 'BurndownCtrl',
			  },
			  'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'views/header.html'
			  }
		    }
      });

  });
