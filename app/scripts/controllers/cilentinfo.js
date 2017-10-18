'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:CilentinfoCtrl
 * @description
 * # CilentinfoCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('CilentinfoCtrl', function ($scope,localStorageService,$location) {

    $scope.customerItem = localStorageService.get("customerItem");

    $scope.UpdateClientInfo = function () {
      $.toast("更新成功");
    }

    $scope.GetBack = function () {
      $location.path("/client/clientDetail/"+$scope.customerItem.Id).replace();
    }


  });
