angular.module('ohtuProjektiAppApp')
  .filter('multiselect', function () {
    return function (issues, $scope) {
       if (!$scope.filtersGrouped) return [];
       var filtered = [];
       var filteredLabels = [];
       var filteredMilestones = [];
       var noMilestones = false;


       /**
        *  Return true if no item is ticked.
        */
       function isNothingTicked() {
           return (filteredLabels.length == 0) && (filteredMilestones.length == 0) && !noMilestones;
       };


         /**
          *  Filters milestones and labels into their respective arrays.
          */
          for (var i = 0; i < $scope.filtersGrouped.length; i++) {
            var item = $scope.filtersGrouped[i];

            // Checks if "No milestone"-item is ticked.
            if (item.type === 'check') {
              noMilestones = item.ticked;
            }

            if (item.ticked) {
              if (item.type === 'label') {
                filteredLabels.push(item);
              }
              if (item.type === 'milestone') {
                filteredMilestones.push(item);
              }
            }

          }

          if (isNothingTicked()) {
            return issues;
          }

        function filterIssues(issue) {
          // Adds to filtered list if the issue has no milestone.
          if (noMilestones) {
            if (issue.milestone) {
              return;
            }
            filtered.push(issue);
            return;
          }
        
          // Adds to filtered list if the issue has a label that currently is ticked.
          for (var i = 0; i < filteredLabels.length; i++) {
            if (checkLabel(issue, filteredLabels[i].name)) {
              filtered.push(issue);
              return;
            }
          }

          // Adds to filtered list if the issue has a milestone that currently is ticked.
          for (var i = 0; i < filteredMilestones.length; i++) {
            if (!issue.milestone) return;
            
            if (issue.milestone.title === filteredMilestones[i].name) {
              filtered.push(issue);
              return;
            }
          }
        }

        /**
         * Returns true if issue has the given label.
         */
        function checkLabel(issue, label) {
          if (!issue.labels)
            return false;
      
          for (var i = 0; i < issue.labels.length; i++) {
            if (issue.labels[i].name === label) {
              return true;
            }
          }

          return false;
        }
        
        angular.forEach(issues, filterIssues);

        return filtered;
    };
  });
