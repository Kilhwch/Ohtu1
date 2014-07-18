'use strict';

var myApp = angular.module('ohtuProjektiAppApp');

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        url: '/',
        views: {
          "header": {templateUrl: 'views/index.header.html'},
          "main": {
	      	templateUrl: 'views/index.main.html',
	        controller: 'MainCtrl'
	      },
          "footer": {templateUrl: 'views/index.footer.html',
                    controller: 'FooterCtrl'}
        }
      })
      .state('index.main',{
      	url: "/main",
      	templateUrl: 'views/index.main.html',
        controller: 'MainCtrl'
      })
      .state('index.login',{
      	url: "/login",
      	templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });
  });