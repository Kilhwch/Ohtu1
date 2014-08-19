angular.module('ohtuProjektiAppApp')
  .filter('multiselect', function ($rootScope) {
    return function (issues, scope) {
      //console.log("scopeID in filter: ", scope.$id);
       if (!scope.filtersGrouped) return issues
       var filtered = [];
       var filteredLabels = [];
       var filteredMilestones = [];
       var noMilestones = false;
       
       //var tickedMilestones = [];


       /**
        *  Return true if a milestone is ticked.
        */
       function isMilestoneTicked() {
           return (filteredMilestones.length != 0);
       };

       /**
        *  Return true if a label is ticked.
        */
       function isLabelTicked() {
           return (filteredLabels.length != 0);
       };

       /**
        *  Return true if no item is ticked.
        */
       function isNothingTicked() {
           return !isLabelTicked() && !isMilestoneTicked() && !noMilestones;
       };


         /**
          *  Filters milestones and labels into their respective arrays.
          */
          for (var i = 0; i < $rootScope.filtersGrouped.length; i++) {
            var item = $rootScope.filtersGrouped[i];

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
            if (issue.milestone && !isMilestoneTicked()) {
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
  })
  .filter('textfilter', function(){
    return function(issues, filterBy){
      if (filterBy == '') return issues;

      var filtered = [];

      issues.forEach(function(issue){
        if (passesFilter(issue))
          filtered.push(issue)
      });

      function passesFilter(issue){
        return (issue.body && issue.body.indexOf(filterBy) > -1) ||
                (issue.title && issue.title.indexOf(filterBy) > -1) ||
                (issue.number == parseInt(filterBy))
      }
      return filtered;
    }
  });
