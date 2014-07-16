'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ohtuProjektiAppApp
 */

var myApp = angular.module('ohtuProjektiAppApp');

 myApp.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

myApp.controller('MainCtrl', function ($scope,$http) {
    $http.get('https://api.github.com/repos/pauge/TiraLabra/issues/2').success(function(issue)
    {
      
      $scope.task = issue;
    }).error(function() {
        $scope.task = {id: "Virhe"}
    })
    
    //var xhr = new XMLHttpRequest();
    //xhr.open('GET', 'https://github.com/pauge/TiraLabra/issues/2?');
    //xhr.onreadystatechange = function () {
      //if (this.status == 200 && this.readyState == 4) {
        //console.log('response: ' + this.responseText);
      //}
    //};
    //xhr.send();
  });
  
