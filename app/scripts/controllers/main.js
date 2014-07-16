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
    });
   OAuth.initialize('CHkmXQc9pfI3vqPZectNDagrwSc');
   OAuth.popup('github')
      .done(function(results) {
        result.get('https://api.github.com/repos/Kilhwch/Ohtu1/issues/1')
        .done(function (response) {
          console.log(response);
        })
        .fail(function (err) {
          console.log(err);
        });
      })
      .fail(function (err) {
        console.log(err);
      });
  });
  
