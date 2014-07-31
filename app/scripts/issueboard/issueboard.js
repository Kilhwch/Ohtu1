'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function ($scope, $state, $stateParams, github, $modal) {
    
    if (!github.isAuthenticated()) $state.go('main');

    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    var milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    var labels = new github.Label($stateParams.owner,$stateParams.repoName);
    var temp;
    

    
     labels.list().success(function(data) {
         $scope.labels = data
         
     });

    milestones.list().success(function(data) {
        $scope.milestones = data;
        //temp = data;
        $scope.init();
    });

    issues.list().success(function(data) {
        data.editing = false;
        $scope.issues = data;
    });

    $scope.editItem = function(issue){
        issue.editingbody = issue.body;
        issue.editing = true;
    };

    $scope.cancelEditing = function(issue){
        issue.editing = false;
    };

    $scope.doneEditing = function(issue){
        var temp = issue.body;
        issue.body = issue.editingbody;
        issues.updateIssue(issue.number, {body:issue.body}).error(function(data){
            issue.body = temp;
        });
        issue.editing = false;
    };
    
    $scope.changedMilestone = function(issue, oldmilestone){
        issues.updateIssue(issue.number, {milestone:issue.milestone.number}, function(){}, function(error){
               issue.milestone = oldmilestone;
        });
        issue.editing = false;
    };
    $scope.changedLabel = function(issue, oldlabels){
        issues.updateIssue(issue.number, {labels:issue.labels}, function(){},function(error){
            issue.labels = oldlabels;
        });
        issue.editing = false;
    };

    $scope.getLabelColor = function(issue){
      return (issue.labels.length === 0)? "": "#" + issue.labels[0].color;
    };

    $scope.openNewIssueModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newissue.html',
        controller: 'NewissueCtrl',
        scope: $scope 
      });
    };
    
    $scope.isReady = function() {
        angular.forEach( $scope.filtersGrouped, function( value, key ) {
            if ( value.ticked === true ) {
                
            }
        })
    };
    
    // dropdown valikko
    
    $scope.init = function() {
      
        $scope.filtersGrouped = [];
        
        $scope.filtersGrouped.push({name: '<strong>Milestones</strong>', multiSelectGroup: true});
        
        for (var i = 0; i < $scope.milestones.length; i++) {
            var title = $scope.milestones[i].title;
            $scope.filtersGrouped.push({name: title, ticked: true, type: 'milestone'});
        }
        
        $scope.filtersGrouped.push({ multiSelectGroup: false});
        
        
        $scope.filtersGrouped.push({name: '<strong>Labels</strong>', multiSelectGroup: true});
        
        for (var i = 0; i < $scope.labels.length; i++) {
            var name = $scope.labels[i].name;
            $scope.filtersGrouped.push({name: name, ticked: true, type: 'label'});
        }
        
        $scope.filtersGrouped.push({ multiSelectGroup: false});
    };
    
});
