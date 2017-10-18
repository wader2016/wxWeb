'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:AddclientCtrl
 * @description
 * # AddclientCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('AddclientCtrl', function ($scope,$location) {
    $scope.GetBack = function () {
      $location.path('/client/clientInfo').replace();
    }
  });
