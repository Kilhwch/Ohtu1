'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('HeaderCtrl', function($scope, github) {
    if (github.isAuthenticated()) {
      $scope.link = "logout";
    } else {
      $scope.link = "login";
    }
  });

