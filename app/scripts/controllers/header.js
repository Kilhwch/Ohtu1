'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('HeaderCtrl', function($scope, $location, github) {
    $scope.url = $location.url();
    $scope.list = [{name: 'Home', url : '/main'}, {name: 'List', url: '/list'}];
    if (github.isAuthenticated()) {
      $scope.list.push({name: 'Logout', url: '/logout'});
    } else {
      $scope.list.push({name: 'Login', url: '/login'});
    }
    for (var i = 0; i < $scope.list.length; i++) {
      if ($scope.list[i].url === $scope.url) {
         $scope.list[i].class = "active";
      }
    }
  });

