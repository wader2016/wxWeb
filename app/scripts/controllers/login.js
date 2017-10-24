'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('LoginCtrl', function ($scope,localStorageService,$timeout,ClientFactory,$location) {

    $scope.UserInfo = localStorageService.get("MY_USER_INFO");

    $scope.LoginUser = {
      "Email":"",
      "Password":"",
      "OpenId":$scope.UserInfo.openid,
      "Name":$scope.UserInfo.nickname
    };

    $scope.BindUser = function () {
      if($scope.LoginUser.email ==""){
        $.toast("请填写邮箱","forbidden");
        return;
      }
      var info = {"jsonStr":JSON.stringify($scope.LoginUser)};
      ClientFactory.SetAccountInfo(info).then(function (data) {
        if(data>0){
          $.toast("绑定成功");
          $location.path("/client/clientInfo");
        }
      });
    }









  });
