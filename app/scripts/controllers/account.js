'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:AccountCtrl
 * @description
 * # AccountCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('AccountCtrl', function ($scope,ClientFactory,localStorageService) {

    $scope.userInfo = localStorageService.get("MY_USER_INFO");

    $scope.accountInfo = {
      "Id":"",
      "UserName":"",
      "Nick":"",
      "EnglishName":"",
      "Email":""
    };

    $scope.accountInfo = localStorageService.get("AccountInfo");


    $scope.SaveAccount = function () {

      var info = {
        "openId":$scope.userInfo.openid,
        "jsonStr":JSON.stringify($scope.accountInfo)
      };

      ClientFactory.SetAccountInfo(info).then(function (data) {
        $.toast(data);
      });
    }







  });
