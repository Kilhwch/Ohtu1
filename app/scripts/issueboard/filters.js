angular.module('ohtuProjektiAppApp')
  .filter('slug', function () {
  
    function checkLabel(issue, label) {
      
      if (!issue.labels) return false;
      for (var i = 0; i < issue.labels.length; i++) {
        if (issue.labels[i].name === label) {
          return true;
          }
        return false;
      }
    }  

    return function (issues, $scope) {
       if (!$scope.filtersGrouped) return [];
       var filtered = [];
       var filteredLabels = [];
       var filteredMilestones = [];

          for (var i = 0; i < $scope.filtersGrouped.length; i++) {
            var item = $scope.filtersGrouped[i];
            if (item.ticked) {
              if (item.type === 'label') {
                filteredLabels.push(item);
              }
              if (item.type === 'milestone') {
                filteredMilestones.push(item);
              }
            }
          }
       
        angular.forEach(issues, function(issue) {
        
          if (!issue.milestone) {
            filtered.push(issue);
            return;
          }
        
          for (var i = 0; i < filteredLabels.length; i++) {
            if (checkLabel(issue, filteredLabels[i].name)) {
              filtered.push(issue);
              return;
            }
          }

          for (var i = 0; i < filteredMilestones.length; i++) {
            if (issue.milestone.title === filteredMilestones[i].name) {
              filtered.push(issue);
              return;
            }
          }
        });

        return filtered;
    };
  });
