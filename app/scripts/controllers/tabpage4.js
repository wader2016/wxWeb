'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:Tabpage4Ctrl
 * @description
 * # Tabpage4Ctrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('Tabpage4Ctrl', function ($scope,localStorageService) {


    $scope.userInfo = localStorageService.get('MY_USER_INFO');



  });
