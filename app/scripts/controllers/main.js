'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wxWebApp
 */

app.controller('MainCtrl', function ($scope,$location,localStorageService) {

    if(localStorageService.get("urlName")){
      $scope.urlName = localStorageService.get("urlName");
    }
    else {
      $scope.urlName = 'main';
    }

    $scope.LoadPage = function (url) {
      localStorageService.set("urlName",url);
      $location.url(url);
      $scope.urlName = url;
    };

    // 加入购物车
    $scope.AddCart = function () {
     $.toast("操作成功");
      // $.toast("取消操作", "cancel");
    }
  });
