'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function ($scope, $stateParams,github) {
    $scope.milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    $scope.milestones.list({}, function(data) {
        $scope.milestones = data;
        console.log(data);
    });
    $scope.issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    $scope.issues.list({}, function(data) {
        $scope.issues = data;
    });

  });
