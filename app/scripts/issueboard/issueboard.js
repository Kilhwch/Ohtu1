'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:IssueboardCtrl
 * @description
 * # IssueboardCtrl
 * Controller of the ohtuProjektiAppApp
 */


angular.module('ohtuProjektiAppApp')
  .controller('IssueboardCtrl', function($scope, $filter, $state,
        $stateParams, github, filteringOptions, $modal, $window, alertService) {

    if (!github.isAuthenticated()) $state.go('main');

    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    var milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    var labels = new github.Label($stateParams.owner,$stateParams.repoName);
    var assignees = new github.Assignee($stateParams.owner,$stateParams.repoName);
    
    $scope.$root.createOptions = ['Issues','Labels','Milestones'];

    milestones.list().success(function(data) {
        $scope.milestones = data;
        
        labels.list().success(function(data) {
            $scope.labels = data;
            assignees.list().success(function(data) {
                data.editing = false;
                $scope.assignees = data;
                filteringOptions.init($scope.labels, $scope.milestones, $scope.assignees)
            });         
        });
    });

    issues.list().success(function(data) {
        data.editing = false;
        $scope.issues = data;
    }).error(function(data){
        alertService.addAlert('danger', data.message);
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
            alertService.addAlert('danger', 'Could not assign');
        });
        issue.editing = false;

    };

    $scope.clearAssignee = function(issue){
        issues.updateIssue(issue.number,{assignee:null}, function(data, response){issue.assignee = data.assignee},function(data, error){
            alertService.addAlert('danger', 'Could not remove assignee');
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

    $scope.$root.openModal = function(choice) {
        if(choice === "Issues") {
            $scope.openNewIssueModal();
        }
        if(choice === "Labels") {
            $scope.openNewLabelModal();
        }
        if(choice === "Milestones") {
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
        templateUrl: 'scripts/issueboard/managelabels/managelabels.html',
        controller: 'ManagelabelsCtrl',
        scope: $scope 
      });
    };

    $scope.openNewMilestoneModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/managemilestones/managemilestones.html',
        controller: 'ManagemilestonesCtrl',
        scope: $scope 
      });
    };

    $scope.openDeleteMilestoneModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newmilestone/deletemilestone.html',
        controller: 'NewmilestoneCtrl',
        scope: $scope 
      });
    };

    $scope.$watch(
    	function(){return filteringOptions.getTextFilter();}
    	, function(newText, oldText){
        $scope.textFilter = newText.filter;
    }, true);
    
    $scope.issueBoxDragStarted = function(object, item, issue){    
	    $scope.dragedissue = issue;
	    var context = item.helper.context;
	    var elem = angular.element(context);
	    elem.css({
	    	visibility: 'visible'
	    });
    };

    $scope.issueBoxDragStopped = function(item){
    	var elem = angular.element(item.target);
    	elem.css({
    		visibility: 'visible'
    	});
    }

    $scope.issueDroppedReady = function(item) {
        $scope.issueDropped('State:Done','State:InProgress', 'State:Ready');
    };

    $scope.issueDroppedInProgress = function(item) {
        $scope.issueDropped('State:Ready','State:Done', 'State:InProgress');
    };
    $scope.issueDroppedDone = function(item) {
        $scope.issueDropped('State:Ready','State:InProgress', 'State:Done');
    };
    
    var replaceLabelName = function() {
        for (var i = 0; i < $scope.issues.length; ++i) {
            if ($scope.issues[i].number == $scope.dragedissue.number) {
                $scope.issues[i].labels = $scope.dragedissue.labels;
            }
        }   
        issues.updateIssue($scope.dragedissue.number, {labels: $scope.dragedissue.labels}, 
                  function(data, response){$scope.dragedissue.labels = data.labels}, function(error){});
    }
    
    $scope.issueDropped = function(string1, string2, string3) {
        var backlogB = true;
        for (var i = 0; i < $scope.dragedissue.labels.length; ++i) {
            var l = $scope.dragedissue.labels[i].name;
            if (l == string1 || l == string2) {
                $scope.dragedissue.labels[i].name = string3;
                backlogB = false;
            }
        }
        if (backlogB) {
            $scope.dragedissue.labels.unshift(string3);
        }
        replaceLabelName();
    };

    $scope.issueDroppedBacklog = function(item) {
        for (var i = 0; i < $scope.dragedissue.labels.length; ++i) {
            var l = $scope.dragedissue.labels[i].name;
            if (l == 'State:Ready' || l == 'State:InProgress' || l == 'State:Done') {
                $scope.dragedissue.labels.splice(i,1);
            }
        }
        replaceLabelName();
    };
});
