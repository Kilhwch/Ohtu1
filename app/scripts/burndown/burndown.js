'use strict';

/**
 * @ngdoc function
 * @name ohtuProjektiAppApp.controller:BurndownCtrl
 * @description
 * # BurndownCtrl
 * Controller of the ohtuProjektiAppApp
 */
angular.module('ohtuProjektiAppApp')
  .controller('BurndownCtrl', function ($scope, $stateParams, github) {
    var issues = new github.Issue($stateParams.owner, $stateParams.repoName);
    $scope.listOfIssues;
    issues.list().success(function (data) {
      console.log(data[0]);
      $scope.listOfIssues = data;
      $scope.data = [];
      var k = 0;
      for (var i = 0; i < $scope.listOfIssues.length; ++i ) {
        $scope.data.push(
          {
            x: new Date($scope.listOfIssues[i].created_at),
            val_0: k,
          }
          );
        k++;
      }
    /*
    $scope.data = [
    {
    x: new Date($scope.listOfIssues[0].created_at),
    val_0: 0,
    val_1: 0,
    val_2: 0,
    val_3: 0
    },
    {
    x: new Date(1404287865570),
    val_0: 0.993,
    val_1: 3.894,
    val_2: 8.47,
    val_3: 14.347
    },
    ];
    */
      });

    $scope.options = {
  axes: {x: {type: "date", key: "x"}, y: {type: "linear"}},
  series: [
    {
      y: "val_0",
      label: "Issues created",
      color: "#9467bd",
      axis: "y",
      type: "line",
      thickness: "2px",
      id: "series_0",
      visible: true,
      lineMode: undefined,
    }
  ],
  tooltip: {
    mode: "scrubber",
  },
  stacks: [],
  lineMode: "linear",
  tension: 0.7,
  drawLegend: true,
  drawDots: true,
  columnsHGap: 5
  };
});
