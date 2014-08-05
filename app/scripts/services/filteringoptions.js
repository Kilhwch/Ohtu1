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
     var filters = {textFilter : ""};

     return {
     	getTextFilter : function(){
     		return filters;
     	},

     	setTextFilter : function(newFilter){
	     	filters.textFilter = newFilter;
     	}
     };
     
  });
