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
    'ui.bootstrap',
    'multi-select'
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
				templateUrl: 'scripts/main/main.html',
				controller: 'IssueboardCtrl',
			},
			'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'scripts/header/header.html'
			}
		}
      })
      .state('logout', {
        url: '/logout',
                views: {
                        '': {
                                templateUrl: 'scripts/user/logout.html',
                                controller: 'LogoutCtrl',
                        },
                        'header@': {
				controller: 'HeaderCtrl',
                                templateUrl: 'scripts/header/header.html'
                        }
                }
      })
      .state('list', {
      	url: '/list',
		views: {
			'': {
				templateUrl: 'scripts/list/list.html',
				controller: 'ListCtrl',
			},
			'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'scripts/header/header.html'
			}
		}
      })
      .state('repository', {
      	url: '/repos/:owner/:repoName',		
		views: {
			'': {
        templateUrl: 'scripts/issueboard/issueboard.html',
				controller: 'IssueboardCtrl',
			},
			'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'scripts/header/header.html'
			},
			'newissue@repository': {
			    templateUrl: 'scripts/issueboard/newissue.html',
			    controller: 'NewissueCtrl'
			 },
			'newlabel@repository': {
			    templateUrl: 'scripts/issueboard/newlabel.html',
			    controller: 'NewlabelCtrl'
			 },
			 //'multiselect@repository': {
			 //   templateUrl: 'scripts/multiselect/multiselect.html',
			 //   controller: 'multiselectCtrl'
			 //}
		}
      })
      .state('burndown', {
      	url: '/repos/:owner/:repoName/burndown',		
	    	views: {
			    '': {
          templateUrl: 'scripts/burndown/burndown.html',
				  controller: 'BurndownCtrl',
			  },
			  'header@': {
				controller: 'HeaderCtrl',
				templateUrl: 'scripts/header/header.html'
			  }
		    }
      });
  });
