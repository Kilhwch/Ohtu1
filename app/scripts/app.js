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
    'ui.router',
    'angularCharts',
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
    $stateProvider   
      .state('main', {
      	url: '/main',		
		views: {
			'': {
				templateUrl: 'views/main.html',
				controller: 'IssueboardCtrl',
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
				controller: 'IssueboardCtrl',
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
      })
      .state('newissue', {
      	url: '/repos/:owner/:repoName/newissue',		
	    	views: {
			    '': {
          templateUrl: 'views/newissue.html',
				  controller: 'NewissueCtrl',
			  },
			  'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'views/header.html'
			  }
		    }
      });

  });
