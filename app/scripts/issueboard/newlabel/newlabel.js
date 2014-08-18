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
                if(label.state == true) label.name = "State:"+label.name;
                var options = {name: label.name};
                labels.createLabel(options, function(data,response) {
                    alert("Created label: " + label.name);
                    $scope.labels.push(data);
                }, function(error) {
                    alert("Creation unsuccessful");
                });
                reload();
                $scope.close();
            };

            $scope.renameLabel = function(label, newname) {
                console.log(label);
                var options = {name: newname};
                labels.updateLabel(label, options, function(data,response) {
                    alert("Renamed label: " + label);
                    $scope.labels.push(data);
                }, function(error) {
                    alert("Rename unsuccessful");
                });
                reload();
                $scope.close();
            };

            $scope.deleteLabel = function(label) {
                if (label !== "State:Ready" && label !== "State:InProgress" && label !== "State:Done") {
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
