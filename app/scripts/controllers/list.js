'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:ListCtrl
 * @description
 * # ListCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('ListCtrl', function ($scope, github) {
    if (!github.isAuthenticated()) $state.go('login');
    github.userRepos(function(data) {
      $scope.repos = data;
    });
  });
