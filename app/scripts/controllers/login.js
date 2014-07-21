'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the ohtuProjektiAppApp
 */

angular.module('ohtuProjektiAppApp')
  .controller('LoginCtrl', function($scope, $state, github, auth) {
       $scope.signin = function(){
       		var gitauth = auth.askAuth();
          gitauth.done(function(result){
            github.loginWithToken(result.access_token);
            $state.go('main');
            $scope.$apply();
          })
          .fail(function(err){
            console.log(err);
          });         
       	};
	});
