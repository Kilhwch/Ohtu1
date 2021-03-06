'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('HeaderCtrl', function($scope, $location, github, filteringOptions,
              $state, $stateParams) {
    $scope.currentState = $state.current.name;
    $scope.params = $state.params;
    $scope.isLoggedIn = github.isAuthenticated();
    $scope.textFilter = {filter: ""};
    $scope.groupedFilters = [];
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

    // Tracks text filter and updates filtering service accordingly
    $scope.textFilterChanged = function(){
      filteringOptions.setTextFilter($scope.textFilter.filter);
    }

    // Watches for init of filter groups and updates scope variable accordingly
    $scope.$watch(function(){return filteringOptions.getGroupedFilters();},
      function(newFilters, oldFilters){
        $scope.groupedFilters = newFilters;
      })
 });

