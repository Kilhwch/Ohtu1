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
     var groupedFilters = {}

     return {
        getGroupedFilters : function(){
            return groupedFilters;
        },

     	getTextFilter : function(){
     		return textFilter;
     	},

     	setTextFilter : function(newFilter){
	     	textFilter.filter = newFilter;
     	}
     };
     
  });
