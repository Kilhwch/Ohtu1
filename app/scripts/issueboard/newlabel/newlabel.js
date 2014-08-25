'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewlabelCtrl
 * @description
 * # NewlabelCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('NewlabelCtrl', function($scope, github, $state,$stateParams, $modalInstance, alertService) {
            var labels = new github.Label($stateParams.owner, $stateParams.repoName);
            var reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.createLabel = function(label) {
                if(label.state == true) label.name = "State:"+label.name;
                var options = {name: label.name};
                labels.createLabel(options, function(data,response) {
                    alertService.addAlert('success', 'Created label: ' + label.name);
                    $scope.labels.push(data);
                }, function(error) {
                    alertService.addAlert('danger', 'Creation unssuccessful:');
                });
                reload();
                $scope.close();
            };

            $scope.renameLabel = function(label, newname) {
                console.log(label);
                var options = {name: newname};
                labels.updateLabel(label, options, function(data,response) {
                    alertService.addAlert('success', 'Renamed label: ' + label);
                    $scope.labels.push(data);
                }, function(error) {
                    alertService.addAlert('danger', 'Rename unssuccessful:');
                });
                reload();
                $scope.close();
            };

            $scope.deleteLabel = function(label) {
                if (label !== "State:Ready" && label !== "State:InProgress" && label !== "State:Done") {
                    labels.deleteLabel(label, function() {
                        alertService.addAlert('success', 'Deleted label: ' + label);
                    }, function(error) {
                        alertService.addAlert('danger', 'Deletion unssuccessful:');
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
