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

    $scope.getClass = function(path, url) {
      url = url || $location.path();
      if (url.substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }

    $scope.newIssue = function(){
      $rootScope.$broadcast('addItem', {choice: 'New issue'});
    };

    $scope.newLabel = function(){
      $rootScope.$broadcast('addItem', {choice: 'New label/Delete label'});
    };

    $scope.newMilestone = function(){
      $rootScope.$broadcast('addItem', {choice: 'New milestone'});
    };

 });

