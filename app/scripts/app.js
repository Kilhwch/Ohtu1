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
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
  .factory('auth', function(){

  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('index', {
        url: '/',
        views: {
          "header": {templateUrl: 'views/index.header.html'},
          "login": {templateUrl: 'views/index.login.html',
                    controller: 'LoginCtrl'}
        },
        controller: 'MainCtrl'
      })
      .state('about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      });

  });
