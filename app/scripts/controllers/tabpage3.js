'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:Tabpage3Ctrl
 * @description
 * # Tabpage3Ctrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('Tabpage3Ctrl', function ($scope,$location) {

    $scope.ProductList = [
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1},
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1},
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1},
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1}
    ];


    $scope.TotalPrice = 0;
    $scope.Edit = false;
    $scope.editText = '编辑';
    $scope.ShowText = "结算";
    $scope.EditCart = function () {
      $scope.deleteId = [];
      $scope.ClickAll = false;
      for(var i = 0;i<$scope.ProductList.length;i++){
        $scope.ProductList[i].checkItem = false;
      }
      $scope.TotalPrice = 0;
      $scope.SelectProduct = [];

      if($scope.Edit){
        $scope.editText = '编辑';
        $scope.ShowText = "结算";
        $scope.Edit = false;
      }
      else{
        $scope.editText = '完成';
        $scope.ShowText = "删除";
        $scope.Edit = true;
      }

    };

    $scope.SelectProduct = [];

    $scope.deleteId = [];

    // 单选
    $scope.CheckList = function (item) {
      if(!item.checkItem){
        $scope.deleteId.push(item.Id);
        $scope.TotalPrice +=item.SalesPrice*item.ProductQty;
        $scope.SelectProduct.push(item);
        item.checkItem = true;
      }
      else{
        $scope.TotalPrice -=item.SalesPrice*item.ProductQty;
        $scope.ClickAll = false;
        var index = $scope.SelectProduct.indexOf(item);
        var deleteIndex = $scope.deleteId.indexOf(item.Id);
        $scope.SelectProduct.splice(index,1);
        $scope.deleteId.splice(deleteIndex,1);
        item.checkItem = false;
      }

    };

    $scope.ClickAll = false;
    // 全选
    $scope.SelectAll = function () {
      if(!$scope.ClickAll){
        SelectItem($scope.ProductList,true);
        $scope.ClickAll = true;
      }
      else{
        SelectItem($scope.ProductList,false);
        $scope.TotalPrice = 0;
        $scope.SelectProduct = [];
        $scope.ClickAll = false;
      }
    };

    function SelectItem(array,tags){
      for(var i=0;i<array.length;i++){
        if(!array[i].checkItem){
          $scope.SelectProduct.push(array[i]);
          $scope.deleteId.push(array[i].Id);
          $scope.TotalPrice += array[i].SalesPrice * array[i].ProductQty;
        }
        array[i].checkItem = tags;
      }
    }


    $scope.DeleteProduct = function (item) {
      $scope.deleteItemId = item.Id;
      $("#iosDialog1").css({"opacity":1,"display":"block"});
    };

    $scope.Cancel = function () {
      $("#iosDialog1").css({"opacity":0,"display":"none"});
    };

    $scope.CancelConfirm = function () {
      $("#iosDialog1").css({"opacity":0,"display":"none"});
      var deleteId = [];
      if($scope.deleteItemId){
        deleteId.push($scope.deleteItemId);
      }
      else{
        deleteId = $scope.deleteId;
      }

    };

    $scope.SubmitOrDelete = function () {
      if($scope.Edit){    // 删除
        if($scope.deleteId.length>0){
          $("#iosDialog1").css({"opacity":1,"display":"block"});
        }
      }
      else{           // 结算
        if($scope.SelectProduct.length>0){
         // localStorageService.set("SelectProduct",$scope.SelectProduct);
          $location.path("/find/submitOrder");
        }
      }
    };


    $scope.SubtractQty = function (item) {
      if(item.ProductQty>1){
        item.ProductQty--;
      }
      var updateInfo = {"ShoppingCartLineId":item.Id,'Qty':item.ProductQty};
      CartService.UpdateShoppingCart(updateInfo);
    };

    $scope.AddQty = function (item) {
      item.ProductQty++;
      var updateInfo = {"ShoppingCartLineId":item.Id,'Qty':item.ProductQty};
      CartService.UpdateShoppingCart(updateInfo);
    };

    $scope.ProductDetail = function (item) {
      console.log(item);
    }

  });
