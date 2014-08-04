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
    
    //$scope.userName = github.authenticatedUser

    //$scope.options = ['New issue','New label/Delete label','New milestone'];

    $scope.getClass = function(path, url) {
      url = url || $location.path();
      if (url.substr(0, path.length) == path) {
        return "active"
      } else {
        return ""
      }
    }

    /*$scope.doAction = function(choice){
      $rootScope.$broadcast('addItem', {choice: choice});
    }*/

    /*
    $scope.changedMilestone = function(milestone){
        $rootScope.$broadcast('changedMilestone', {milestone : milestone});
    };

    $scope.$on('viewIssueboard', function(event, args){
      $scope.milestones = args.milestones;
    });
  */
 });

