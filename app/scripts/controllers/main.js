'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */

var myApp = angular.module('ohtuProjektiAppApp');

myApp.controller('MainCtrl', function ($scope,$http) {
    $http.get('https://api.github.com/repos/Kilhwch/Ohtu1/issues').success(function(issue)
    {
      $scope.tasks = issue;
    }).error(function() {
        $scope.task = {id: "Virhe"}
    })
  });
  
