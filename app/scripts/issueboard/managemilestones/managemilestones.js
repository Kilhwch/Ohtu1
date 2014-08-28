'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:ManagemilestonesCtrl
 * @description
 * # ManagemilestonesCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
        .controller('ManagemilestonesCtrl', function($scope, github, $state,$stateParams, $modalInstance,$filter, alertService) {
            $scope.ghMilestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
            $scope.reload = function () {
                $state.transitionTo($state.current, $stateParams, {
                  reload: true,
                  inherit: false,
                  notify: true
                });
            };
            $scope.createMilestone = function(milestone) {
                var formattedDate = $filter('date')(milestone.due_on, 'yyyy-MM-ddTHH:mmZ');
                var options = {title:milestone.title,description:milestone.description,due_on:formattedDate};
                $scope.ghMilestones.createMilestone(options, function(data,response){
                    alertService.addAlert('success', 'Created milestone: ' + milestone.title);
                    $scope.milestones.push(data);
                }, function(err) {
                    alertService.addAlert('danger', 'Creation unsuccessful:');
                });
                $scope.reload();
                $scope.close();
            };

            $scope.deleteMilestone = function(milestone) {
              if (milestone) {
              $scope.ghMilestones.deleteMilestone(milestone.number, function(data) {
                  alertService.addAlert('success', 'Deleted milestone: ' + milestone.title);
                  //var index = $scope.milestones.indexOf(milestone);
                  //$scope.milestones.slice(index,1);
                  $scope.reload();
                });
              }
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
