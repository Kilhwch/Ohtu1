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
            var reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.createLabel = function(label) {
                var options = {name: label.name};
                labels.createLabel(options, function() {
                    alert("Created label: " + label.name);
                    $scope.labels.push(label);
                }, function(error) {
                    alert("Creation unsuccessful");
                });
                reload();
                $scope.close();
            };
            $scope.deleteLabel = function(label) {
                if (label !== "Ready" && label !== "InProgress" && label !== "Done") {
                    labels.deleteLabel(label, function() {
                        alert("Deleted label: " + label);
                    }, function(error) {
                        alert("Deletion unsuccessful");
                    });
                }
                else {
                    alert("Deletion of '" + label+ "' is not allowed");
                }
                reload();
                $scope.close();
            }
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
        });
