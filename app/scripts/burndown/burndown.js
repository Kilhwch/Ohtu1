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
    });

$scope.data = [
  {
    x: new Date(1404201465570),
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
  {
    x: new Date(1404374265570),
    val_0: 1.947,
    val_1: 7.174,
    val_2: 13.981,
    val_3: 19.991
  },
  {
    x: new Date(1404460665570),
    val_0: 2.823,
    val_1: 9.32,
    val_2: 14.608,
    val_3: 13.509
  },
  {
    x: new Date(1404547065570),
    val_0: 3.587,
    val_1: 9.996,
    val_2: 10.132,
    val_3: -1.167
  },
  {
    x: new Date(1404633465570),
    val_0: 4.207,
    val_1: 9.093,
    val_2: 2.117,
    val_3: -15.136
  },
  {
    x: new Date(1404719865570),
    val_0: 4.66,
    val_1: 6.755,
    val_2: -6.638,
    val_3: -19.923
  },
  {
    x: new Date(1404806265570),
    val_0: 4.927,
    val_1: 3.35,
    val_2: -13.074,
    val_3: -12.625
  },
  {
    x: new Date(1404892665570),
    val_0: 4.998,
    val_1: -0.584,
    val_2: -14.942,
    val_3: 2.331
  },
  {
    x: new Date(1404979065570),
    val_0: 4.869,
    val_1: -4.425,
    val_2: -11.591,
    val_3: 15.873
  },
  {
    x: new Date(1405065465570),
    val_0: 4.546,
    val_1: -7.568,
    val_2: -4.191,
    val_3: 19.787
  },
  {
    x: new Date(1405151865570),
    val_0: 4.042,
    val_1: -9.516,
    val_2: 4.673,
    val_3: 11.698
  },
  {
    x: new Date(1405238265570),
    val_0: 3.377,
    val_1: -9.962,
    val_2: 11.905,
    val_3: -3.487
  },
  {
    x: new Date(1405324665570),
    val_0: 2.578,
    val_1: -8.835,
    val_2: 14.978,
    val_3: -16.557
  },
  {
    x: new Date(1405411065570),
    val_0: 1.675,
    val_1: -6.313,
    val_2: 12.819,
    val_3: -19.584
  },
  {
    x: new Date(1405497465570),
    val_0: 0.706,
    val_1: -2.794,
    val_2: 6.182,
    val_3: -10.731
  },
  {
    x: new Date(1405583865570),
    val_0: -0.292,
    val_1: 1.165,
    val_2: -2.615,
    val_3: 4.63
  },
  {
    x: new Date(1405670265570),
    val_0: -1.278,
    val_1: 4.941,
    val_2: -10.498,
    val_3: 17.183
  },
  {
    x: new Date(1405756665570),
    val_0: -2.213,
    val_1: 7.937,
    val_2: -14.714,
    val_3: 19.313
  },
  {
    x: new Date(1405843065570),
    val_0: -3.059,
    val_1: 9.679,
    val_2: -13.79,
    val_3: 9.728
  },
  {
    x: new Date(1405929465570),
    val_0: -3.784,
    val_1: 9.894,
    val_2: -8.049,
    val_3: -5.758
  },
  {
    x: new Date(1406015865570),
    val_0: -4.358,
    val_1: 8.546,
    val_2: 0.504,
    val_3: -17.751
  },
  {
    x: new Date(1406102265570),
    val_0: -4.758,
    val_1: 5.849,
    val_2: 8.881,
    val_3: -18.977
  },
  {
    x: new Date(1406188665570),
    val_0: -4.968,
    val_1: 2.229,
    val_2: 14.155,
    val_3: -8.691
  },
  {
    x: new Date(1406275065570),
    val_0: -4.981,
    val_1: -1.743,
    val_2: 14.485,
    val_3: 6.866
  },
  {
    x: new Date(1406361465570),
    val_0: -4.795,
    val_1: -5.44,
    val_2: 9.754,
    val_3: 18.259
  },
  {
    x: new Date(1406447865570),
    val_0: -4.417,
    val_1: -8.278,
    val_2: 1.616,
    val_3: 18.576
  },
  {
    x: new Date(1406534265570),
    val_0: -3.864,
    val_1: -9.809,
    val_2: -7.086,
    val_3: 7.625
  },
  {
    x: new Date(1406620665570),
    val_0: -3.156,
    val_1: -9.792,
    val_2: -13.314,
    val_3: -7.951
  },
  {
    x: new Date(1406707065570),
    val_0: -2.323,
    val_1: -8.228,
    val_2: -14.89,
    val_3: -18.704
  }
];

    $scope.options = {
  axes: {x: {type: "date", key: "x"}, y: {type: "linear"}},
  series: [
    {
      y: "val_0",
      label: "A time series",
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
