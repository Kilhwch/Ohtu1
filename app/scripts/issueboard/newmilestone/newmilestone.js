'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:NewmilestoneCtrl
 * @description
 * # NewmilestoneCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('NewmilestoneCtrl', function($scope, github, $state,$stateParams, $modalInstance) {
            $scope.milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
            $scope.reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.createMilestone = function(milestone) {
                var options = {title:milestone.title,description:milestone.description,due_on:milestone.due_on};
                $scope.milestones.createMilestone(options,function(data,response){
                    alert("Created milestone: " + milestone.title);
                    $scope.milestones.push(data);
                },function(err){
                    alert("Creation unsuccessful");
                });
                $scope.close();
            };
            $scope.deleteMilestone = function(milestone) {
                $scope.reload();
                $scope.close();
            };
            $scope.close = function() {
                $modalInstance.dismiss('close');
            };
        });
