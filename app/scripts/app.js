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
    'multi-select',
    'n3-line-chart',
    'ngDragDrop'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    // Github requests using Basic Authentication or OAuth
    // can make up to 5,000 requests per hour.
    // Making a conditional request and receiving a 304 response
    // does not count against your Rate Limit, but it uses cache.

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
			    templateUrl: 'scripts/issueboard/newissue/newissue.html',
			    controller: 'NewissueCtrl'
			 },
			'newlabel@repository': {
			    templateUrl: 'scripts/issueboard/newlabel/newlabel.html',
			    controller: 'NewlabelCtrl'
			 },
			'newmilestone@repository': {
			    templateUrl: 'scripts/issueboard/newmilestone/newmilestone.html',
			    controller: 'NewmilestoneCtrl'
			 },
			'deletemilestone@repository': {
			    templateUrl: 'scripts/issueboard/newmilestone/deletemilestone.html',
			    controller: 'NewmilestoneCtrl'
			 },
			 'multiselect@repository': {
			    templateUrl: 'scripts/multiselect/multiselect.html',
			 }
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
