'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:CilentinfoCtrl
 * @description
 * # CilentinfoCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('CilentinfoCtrl', function ($scope,localStorageService) {

    $scope.customerItem = localStorageService.get("customerItem");

    $scope.UpdateClientInfo = function () {

    }


  });
