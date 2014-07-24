'use strict';

var app = angular.module('ohtuProjektiAppApp');

app.directive('issuebox', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/issueboard.issuebox.html'
    };
});
