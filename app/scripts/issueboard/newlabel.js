'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewlabelCtrl
 * @description
 * # NewlabelCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('NewlabelCtrl', function($scope, github, $state,$stateParams, $modalInstance) {
            var labels = new github.Label($stateParams.owner, $stateParams.repoName);
            $scope.createLabel = function(label) {
                var options = {name: label.name};
                labels.createLabel(options, function() {}, function(error) {
                });
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
                $scope.close();
            };
            $scope.deleteLabel = function(label) {
                if (label !== "Ready" && label !== "InProgress" && label !== "Done") {
                    labels.deleteLabel(label, function() {
                    }, function(error) {
                    });
                }
                else {
                    console.log("Tried to delete forbidden label: " + label);
                }
                $scope.close();
            }
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
        });
