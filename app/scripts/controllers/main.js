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
    $http.get('https://api.github.com/repos/Kilhwch/Ohtu1/issues/1').success(function(issue)
    {
      
      $scope.task = issue;
    }).error(function() {
        $scope.task = {id: "Virhe"}
    })
  });
  
