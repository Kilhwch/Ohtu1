'use strict';

/**
 * @ngdoc service
 * @name ohtuProjektiAppApp.filteringOptions
 * @description
 * # filteringOptions
 * Service in the ohtuProjektiAppApp.
 */
angular.module('ohtuProjektiAppApp')
  .service('filteringOptions', function filteringOptions() {
     var textFilter = {filter : ""};
     var groupedFilters = []

     return {
        getGroupedFilters : function(){
            return groupedFilters;
        },

     	getTextFilter : function(){
     		return textFilter;
     	},

     	setTextFilter : function(newFilter){
	     	textFilter.filter = newFilter;
     	},

        
        // Initialize multiselect filtering
        init : function(labels, milestones, assignees) {
            if (!labels) return;
            groupedFilters = [];
            
            // milestones
            
            groupedFilters.push({name: '<strong>Milestones</strong>', multiSelectGroup: true});
            
            for (var i = 0; i < milestones.length; i++) {
                var title = milestones[i].title;
                groupedFilters.push({name: title, ticked: false, type: 'milestone'});
            }
            groupedFilters.push({ multiSelectGroup: false});
            
            // labels
            
            groupedFilters.push({name: '<strong>Labels</strong>', multiSelectGroup: true});
            
            for (var i = 0; i < labels.length; i++) {
                var name = labels[i].name;
                    if (name != 'State:Done' && name != 'State:InProgress' && name != 'State:Ready') {
                        groupedFilters.push({name: name, ticked: false, type: 'label'});
                    }
            }
            groupedFilters.push({ multiSelectGroup: false});
            
            // assigneet
            groupedFilters.push({name: '<strong>Assignees</strong>', multiSelectGroup: true});
            
            for (var i = 0; i < assignees.length; i++) {
                var name = assignees[i].login;
                    groupedFilters.push({name: name, ticked: false, type: 'assignee'});
            }
            groupedFilters.push({ multiSelectGroup: false});
        }
     };
  });
