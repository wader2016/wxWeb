'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:MyorderCtrl
 * @description
 * # MyorderCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('MyorderCtrl', function ($scope,$stateParams) {

      var tab = $stateParams.tab;
      var href = "#"+tab;
      var node = $(".weui-navbar__item");
      $.each(node,function (key,val) {
        if($(val).attr('href') == href){
          $(this).addClass('weui-bar__item--on').siblings().removeClass('weui-bar__item--on');
          $(href).addClass('weui-tab__bd-item--active').siblings().removeClass('weui-tab__bd-item--active');
        }
      });


      $scope.OrderList = [
        {"SellerContactInfo":"官方旗舰店","Status":2,"SalesOrderLines":[
            {"ProductId":1701,"ProductName1":"山地车","ProductName2":"山地车山地车山地车山地车","SalesPrice":2000,"ProductQty":1}],
          "TotalPackageQty":10,"TotalAmt":2000
        },
        {"SellerContactInfo":"官方旗舰店","Status":2,"SalesOrderLines":[
          {"ProductId":1701,"ProductName1":"山地车","ProductName2":"山地车山地车山地车山地车","SalesPrice":2000,"ProductQty":1}],
          "TotalPackageQty":10,"TotalAmt":2000
        }
      ]
  });
