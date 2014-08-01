'use strict';

var app = angular.module('ohtuProjektiAppApp');

app.factory('myHttpResponseInterceptor', ['$q', '$location',
  function($q,$location){
    return {
     'response': function(response) {
        // do something on success
        return response;
      },

      // optional method
     'responseError': function(rejection) {
        // do something on error
        if (canRecover(rejection)) {
          return responseOrNewPromise
        }
        return $q.reject(rejection);
      }
    };
}]);

app.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);
