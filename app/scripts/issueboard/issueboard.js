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
    $scope.options = { realtime: github.realtime() };

    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    var milestones = new github.Milestone($stateParams.owner, $stateParams.repoName);
    var labels = new github.Label($stateParams.owner,$stateParams.repoName); 
    
    $scope.createOptions = ['New issue','New label/Delete label','New milestone'];
    
    labels.list().success(function(data) {
         $scope.labels = data     
     });

    milestones.list().success(function(data) {
        $scope.milestones = data;
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

    $scope.isInBacklog = function(issue) {
	var count = 0;
	for(var i = 0; i < issue.labels.length; i++){
		if(issue.labels[i].name.match("Ready") || issue.labels[i].name.match("InProgress") || issue.labels[i].name.match("Done")){
			count++;
		}
	}
	if (count === 0){
		return issue;
	}
    };


    $scope.isReady = function(issues) {
	for(var i = 0; i < issue.labels.length; i++){
		if(issue.labels[i].name.match("Ready")){
			return issue;
		}
	}
    };


    $scope.isInProgress = function(issue) {
	for(var i = 0; i < issue.labels.length; i++){
		if(issue.labels[i].name.match("InProgress")){
			return issue;
		}
	}
    };

    $scope.isDone = function(issue) {
    	for(var i = 0; i < issue.labels.length; i++){
		if(issue.labels[i].name.match("Done")){
			return issue;
		}
	}
    };

    $scope.openModal = function(choice) {
        if(choice === "New issue") {
            $scope.openNewIssueModal();
        }
        if(choice === "New label/Delete label") {
            $scope.openNewLabelModal();
        }
        if(choice === "New milestone") {
            console.log(choice+"3")
        }
    };

    $scope.openNewIssueModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newissue.html',
        controller: 'NewissueCtrl',
        scope: $scope 
      });
    };
    
    $scope.openNewLabelModal = function() {
      var modalInstance = $modal.open({
        templateUrl: 'scripts/issueboard/newlabel.html',
        controller: 'NewlabelCtrl',
        scope: $scope 
      });
    };
    
    // dropdown valikko
    
    $scope.init = function() {
      if (!$scope.labels) return;
        $scope.filtersGrouped = [];
        
        $scope.filtersGrouped.push({name: '<strong>Milestones</strong>', multiSelectGroup: true});
        $scope.filtersGrouped.push({name: "No milestone", ticked: false, type: 'check'});
        
        for (var i = 0; i < $scope.milestones.length; i++) {
            var title = $scope.milestones[i].title;
            $scope.filtersGrouped.push({name: title, ticked: false, type: 'milestone'});
        }
        
        $scope.filtersGrouped.push({ multiSelectGroup: false});
        
        
        $scope.filtersGrouped.push({name: '<strong>Labels</strong>', multiSelectGroup: true});
        
        for (var i = 0; i < $scope.labels.length; i++) {
            var name = $scope.labels[i].name;
                if (name != 'Done' && name != 'InProgress' && name != 'Ready') {
                    $scope.filtersGrouped.push({name: name, ticked: false, type: 'label'});
                    console.log(name);
                }
        }
        
        $scope.filtersGrouped.push({ multiSelectGroup: false});
    };
    
    $scope.updateRealtime = function() {
      github.realtime($scope.options.realtime);
    };

    $scope.$on('addItem', function(event, args){
        $scope.openModal(args.choice);
    });
});
