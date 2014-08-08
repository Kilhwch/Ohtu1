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
            $scope.ghMilestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
            $scope.reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.createMilestone = function(milestone) {
                var options = {title:milestone.title,description:milestone.description,due_on:milestone.due_on};
                $scope.ghMilestones.createMilestone(options, function(data,response){
                    alert("Created milestone: " + milestone.title);
                    $scope.milestones.push(data);
                }, function(err) {
                    alert("Creation unsuccessful");
                });
                $scope.close();
            };

            $scope.deleteMilestone = function(milestone) {
              $scope.ghMilestones.deleteMilestone(milestone.number, function(data) {
                  alert("Deleted milestone: " + milestone.title);
                  //var index = $scope.milestones.indexOf(milestone);
                  //$scope.milestones.slice(index,1);
                  $scope.reload();
                });
              $scope.close();
            };

            $scope.close = function() {
                $modalInstance.dismiss('close');
            };

           $scope.open = function($event) {
             $event.preventDefault();
             $event.stopPropagation();
             $scope.opened = true;
           };
        });
