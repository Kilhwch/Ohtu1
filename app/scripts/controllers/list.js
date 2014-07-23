'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('ListCtrl', function ($scope, $state, github) {
    //if (!github.isAuthenticated()) $state.go('main');
    github.userRepos(function(data) {
      $scope.repos = data;
    });
  });
