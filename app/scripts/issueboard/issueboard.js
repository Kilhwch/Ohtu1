'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */


angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function(
    $rootScope, $scope, $filter, $state, $stateParams, github, filteringOptions, $modal, $window) {

    if (!github.isAuthenticated()) $state.go('main');

    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    var milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    var labels = new github.Label($stateParams.owner,$stateParams.repoName);
    var assignees = new github.Assignee($stateParams.owner,$stateParams.repoName);
    
    $scope.createOptions = ['New issue','New label/Delete label','New milestone'];
    
    

    milestones.list().success(function(data) {
        $scope.milestones = data;
        $rootScope.$broadcast('viewIssueboard', {milestones: data});
        
        labels.list().success(function(data) {
         $scope.labels = data;
         $scope.init();  
        });
    });

    assignees.list().success(function(data) {
        data.editing = false;
        $scope.assignees = data;
    });

    issues.list().success(function(data) {
        data.editing = false;
        $scope.issues = data;
    });

    $scope.editItem = function(issue){
        issue.editingbody = issue.body;
        issue.editing = true;
    };

    var reload = function () {
     $state.transitionTo($state.current, $stateParams, {
       reload: true,
       inherit: false,
       notify: true
       });
     };
    
    $scope.changedMilestone = function(issue, oldmilestone){
        issues.updateIssue(issue.number, {milestone:issue.milestone.number}, function(){}, function(error){
               issue.milestone = oldmilestone;
        });
        issue.editing = false;
    };

    $scope.assign = function(issue, assignee){
        issues.updateIssue(issue.number,{assignee:assignee.login}, function(data, response){issue.assignee = data.assignee},function(data, error){
            console.log('Error while assigning assignee');
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

    $scope.openModal = function(choice) {
        if(choice === "New issue") {
            $scope.openNewIssueModal();
        }
        if(choice === "New label/Delete label") {
            $scope.openNewLabelModal();
        }
        if(choice === "New milestone") {
            $scope.openNewMilestoneModal();
        }
        if(choice === "Issue edit") {
            $scope.openIssueEditModal();
        }
        $scope.choice = 0;
    };



    $scope.openIssueEditModal = function(issue) {
      $scope.issue = issue;
      $scope.modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/issuebox/issueboxedit.html',
        controller: 'IssueboxCtrl',
        scope: $scope
      });


    };

    $scope.openNewIssueModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newissue/newissue.html',
        controller: 'NewissueCtrl',
        scope: $scope
      });
    };
    
    $scope.openNewLabelModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newlabel/newlabel.html',
        controller: 'NewlabelCtrl',
        scope: $scope 
      });
    };

    $scope.openNewMilestoneModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newmilestone/newmilestone.html',
        controller: 'NewmilestoneCtrl',
        scope: $scope 
      });
    };
    
    // dropdown valikko
    
    $scope.init = function() {
        //console.log("Initializing issueboard, scope id: ", $scope.$id);
      if (!$scope.labels) return;
        $rootScope.filtersGrouped = [];
        
        $rootScope.filtersGrouped.push({name: '<strong>Milestones</strong>', multiSelectGroup: true});
        $rootScope.filtersGrouped.push({name: "No milestone", ticked: false, type: 'check'});
        
        for (var i = 0; i < $scope.milestones.length; i++) {
            var title = $scope.milestones[i].title;
            $scope.filtersGrouped.push({name: title, ticked: false, type: 'milestone'});
        }
        
        $rootScope.filtersGrouped.push({ multiSelectGroup: false});
        
        
        $rootScope.filtersGrouped.push({name: '<strong>Labels</strong>', multiSelectGroup: true});
        
        for (var i = 0; i < $scope.labels.length; i++) {
            var name = $scope.labels[i].name;
                if (name != 'Done' && name != 'InProgress' && name != 'Ready') {
                    $rootScope.filtersGrouped.push({name: name, ticked: false, type: 'label'});
                }
        }
        
        $rootScope.filtersGrouped.push({ multiSelectGroup: false});
    };

    $scope.$watch(function(){return filteringOptions.getTextFilter();}, function(newFilters, oldFilters){
        $scope.textFilter = newFilters.textFilter;
    }, true);
    
    /*$scope.$on('addItem', function(event, args){
        $scope.openModal(args.choice);
    });*/

    /*
    $scope.$on('changedMilestone', function(event, args){
        console.log("milestone event");
        $scope.sprint.milestone = args.milestone;
    });
    */

  $scope.height = $window.innerHeight - 150;
  $($window).resize(function(){
    $scope.$apply(function(){
      $scope.height = $window.innerHeight - 150;
    });
  });

});
