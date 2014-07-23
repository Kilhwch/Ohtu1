'use strict';

var app = angular.module('ohtuProjektiAppApp');

app.directive('issuebox', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/issueboard.issuebox.html'
    };
})
.directive('hitEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keydown keypress", function(event) {
        if (event.which === 13) {
          event.preventDefault();
          scope.onEnter();
        }
      });
    };
  });