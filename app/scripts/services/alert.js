'use strict';


angular.module('ohtuProjektiAppApp')
  .service('alertService', function($rootScope, $timeout) {
    var alertService = {};

    $rootScope.alerts = [];

    alertService.addAlert = function(type, msg) {
      $rootScope.alerts.push({'type': type, 'msg': msg});
      $timeout(function() {
                $rootScope.alerts.splice(0, 1);
            }, 3000);
    };

    alertService.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };

    return alertService;
});
