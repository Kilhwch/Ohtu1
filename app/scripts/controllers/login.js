'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('LoginCtrl', function($scope, $location, gitapi, auth) {
       $scope.signin = function(){
       		var gitauth = auth.askAuth();
          gitauth.done(function(result){
            gitapi.loginWithToken(result.access_token);
            $location.path('/');
            $scope.$apply();
          })
          .fail(function(err){
            console.log(err);
          });         
       	};
});
