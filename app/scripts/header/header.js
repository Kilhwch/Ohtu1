'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('HeaderCtrl', function($rootScope, $scope, $location, github, $state, $stateParams) {
    $scope.currentState = $state.current.name;
    $scope.params = $state.params;
    $scope.isLoggedIn = github.isAuthenticated();
    github.authenticatedUser().success(function(user){
      $scope.userName = user.login;
      $scope.avatar = user.avatar_url;
    });

    $scope.getClass = function(path, url) {
      url = url || $location.path();
      if (url.substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }
 });
