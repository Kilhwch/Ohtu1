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
    'ngTouch'
  ]).
  factory('gitapi', function(){
    var github;

    return {
      loginWithToken : function(authtoken){
        github = new Github({
          token: authtoken,
          auth: "oauth"
        });
      },
      isAuthenticated : function(){
        return github != undefined;
      },
      getGithub : function(){
        return github;
      }
    };
  })
  .factory('auth', function(){
    OAuth.initialize('CHkmXQc9pfI3vqPZectNDagrwSc');

    return {
      askAuth : function () {
       return OAuth.popup('github');
      }
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
