'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function ($scope, $stateParams) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.repoName = $stateParams.repoName;
    $scope.owner = $stateParams.owner;
  });
