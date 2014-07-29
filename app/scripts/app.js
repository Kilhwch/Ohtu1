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
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // Github requests using Basic Authentication or OAuth
    // can make up to 5,000 requests per hour.
    // Making a conditional request and receiving a 304 response
    // does not count against your Rate Limit, but it uses cache.

    // This configuration "disables" cache.
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }

    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';    

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
			},
			'newissue@repository': {
			    templateUrl: 'views/newissue.html',
			    controller: 'NewissueCtrl'
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
