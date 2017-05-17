'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:SubmitorderCtrl
 * @description
 * # SubmitorderCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('SubmitorderCtrl', function ($scope) {
    $scope.AddressListInfo = [{"Name":'杨云龙',"StrExt2":{"Phone":"13851410501"},"AddressLine2":"江苏省南京市建邺区瑞泰大厦","flag":0}];

    var width = window.innerWidth;
    var length = Math.floor(width/20);
    $scope.Arr = [];
    for(var i=0;i<length;i++){
      $scope.Arr.push(i);
    }

    $scope.totalPrice = 4000;

    $scope.AddressInfo = {
      "Id":0,
      "ContactWay":{"Consignee":'',"Tel":'',"Phone":''},
      'Province':'',
      "City":'',
      "Street":'',
      "Road":'',
      "ZipCode":'',
      "AddressLine1":'',
      "AddressLine2":'',
      "DefaultAddress":false
    };

    $scope.MainAddress = {"Name":'杨云龙',"StrExt2":{"Phone":"13851410501"},"AddressLine2":"江苏省南京市建邺区瑞泰大厦"};

    $scope.ProductList = [
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1},
      {"checkItem":false,"ProductId":1701,"ProductName1":"山地车","ProductName2":"新款UCC 原产欧洲","SalesPrice":2000,"ProductQty":1}
    ];


    $scope.AddNewAddress = function () {
      $("#AddNewAddress").popup();
    };

    $scope.address = "";
    // 保存地址
    $scope.SaveAddress = function () {
      if($scope.AddressInfo.ContactWay.Consignee == ""|| $scope.AddressInfo.ContactWay.Consignee == undefined){
        $.toast("请填写收货人姓名", "text");
        return ;
      }
      else if($scope.AddressInfo.ContactWay.Phone =="" || $scope.AddressInfo.ContactWay.Phone ==undefined){
        $.toast("请填写手机号码", "text");
        return ;
      }
      else if($scope.address ==""||$scope.address ==undefined){
        $.toast("请选择地址", "text");
        return ;
      }
      else if($scope.AddressInfo.AddressLine1 =="" ||$scope.AddressInfo.AddressLine1==undefined){
        $.toast("请填写详细地址", "text");
        return ;
      }

      var address = $scope.address.split(' ');
      $scope.AddressInfo.Province = address[0];
      $scope.AddressInfo.City = address[1];
      $scope.AddressInfo.Street = address[2];
      $scope.AddressInfo.AddressLine2 = $scope.AddressInfo.Province+$scope.AddressInfo.City+$scope.AddressInfo.Street+$scope.AddressInfo.Road+$scope.AddressInfo.AddressLine1;

      $scope.AddressListInfo.push($scope.AddressInfo);
      $scope.MainAddress = $scope.AddressInfo;
      $.closePopup();
    };

    $scope.CancelAddress = function () {
      console.log(111);
      $.confirm({
        title: '警告',
        text: '确认放弃本次编辑？',
        onOK: function () {
          $.closePopup();
        },
        onCancel: function () {

        }
      });
    }

    // 选择收货地址
    $scope.ChangeAddress = function (item) {
      // if(item.flag==0){
      //   return;
      // }
      // else{
      //   item.flag=0;
      //   AddressService.SetDefaultAddressList(104475,item.Id);
      //   for(var i=0;i<$scope.AddressListInfo.length;i++){
      //     if($scope.AddressListInfo[i] != item){
      //       $scope.AddressListInfo[i].flag=1;
      //     }
      //   }
      // }
    }


  });
