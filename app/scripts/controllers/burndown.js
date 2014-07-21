'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:BurndownCtrl
 * @description
 * # BurndownCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('BurndownCtrl', function ($scope) {
  $scope.config = {
    title: 'Project name votes',
    tooltips: true,
    labels: false,
    mouseover: function() {},
    mouseout: function() {},
    click: function() {},
    legend: {
      display: true,
      //could be 'left, right'
      position: 'right'
    }
  };

  $scope.data = {
    series: ['Haitari', 'AgileHub', 'GitTasker', 'TaskTable'],
    data: [{
      x: "Haitari",
      y: [0],
      tooltip: "this is tooltip"
    }, {
      x: "AgileHub",
      y: [2]
    }, {
      x: "GitTasker",
      y: [2]
    }, {
      x: "TaskTable",
      y: [2]
    }]
  };
      });
