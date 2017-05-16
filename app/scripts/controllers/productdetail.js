'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:ProductdetailCtrl
 * @description
 * # ProductdetailCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('ProductdetailCtrl', function ($scope) {
     $scope.SelectColor = function () {
       $("#SelectColor").popup();
     };

     $scope.Color = [{"Name":"极致红","checked":2},{"Name":"极致蓝","checked":2},{"Name":"极致黑","checked":2}];
    $scope.Size = [{"Name":"17","checked":2},{"Name":"18","checked":2},{"Name":"19","checked":2}];
  });
