'use strict';

var app = angular.module('ohtuProjektiAppApp');

app.directive('issuebox', function() {
    return {
        restrict: 'E',
        templateUrl: 'scripts/issueboard/issuebox/issueboard.issuebox.html'
    };
});
