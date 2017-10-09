'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('ClientCtrl', function ($scope,ClientFactory,$location,localStorageService,$timeout) {

    $scope.Search = function () {
      // 打开搜索背景
      $("#searchLabel").css({"display":"block"});
      $("#bg").css({"display":"block"});
      // 关闭筛选背景
      $("#filterResult").css({"display":"none"});
      $("#filterBg").css({"display":"none"});
      $scope.filterAction = false;
      // 打开时禁止滚动
      $("body").css({"position":"fixed","width":"100%","height":"100%"});
    }

    $scope.SearchText = function (event) {
      GetDataBySearching(0,event.target.value)
      $("#searchResult").css({"display":"block"});
      $("#searchResult").height(window.screen.height-46);

    }

    $scope.CancelSearch = function () {
      $("#searchLabel").css({"display":"none"});
      $("#bg").css({"display":"none"});
      $("#searchResult").css({"display":"none"});
      $("body").css({"position":"static","width":"100%","height":"100%"});

    }

    $scope.filterAction = false;
    $scope.Filter = function () {
      $scope.filterAction = !$scope.filterAction;
      if($scope.filterAction){
        $("#filterResult").css({"display":"block"});
        $("#filterBg").css({"display":"block"});
        $("body").css({"position":"fixed","width":"100%","height":"100%"});
      }
      else {
        $("#filterResult").css({"display":"none"});
        $("#filterBg").css({"display":"none"});
        $("body").css({"position":"static","width":"100%","height":"100%"});
      }

    }

    $scope.Confirm = function () {
      $scope.filterAction = false;
      $("#filterResult").css({"display":"none"});
      $("#filterBg").css({"display":"none"});
      $("body").css({"position":"static","width":"100%","height":"100%"});
    };

    $scope.CustomerList = [];

    GetData(1);

   $scope.PartnerInfo =  {
     "ACTIONCODE":"A"
    ,"OrganizationId":""
    ,"OrganizationListId":""
    ,"OrganizationCode":""
    ,"OrganizationName":""
    ,"OrganizationAbbr":""
    ,"ContactName":""
    ,"ContactCode":""
    ,"Email":""
    ,"TelNumber":""
    ,"ProductInfo":""
    ,"ContractDeadline":""
    ,"BusinessStaff":""
    ,"ServiceStaff":""
    ,"Licenses":""
    ,"ContactId":""
    ,"BusinessStaffId":""
    ,"ServiceStaffId":""
   }

    $scope.CustomerDetail = function (item) {
      localStorageService.set("customerItem",item);
      $location.path("/client/clientDetail/"+item.Id);
    };

    $scope.TypeItem = [];
    ClientFactory.GetAppointmentDropdownList({"filterJson":{"DropdownList":"Staff"}}).then(function (data) {
     $scope.StaffInfo = data;
      for(var i = 0;i<data.length;i++){
        $scope.TypeItem.push(data[i].Name);
      }
    });

    $scope.$watch("PartnerInfo.BusinessStaff",function (newVal) {
      if(newVal){
        $scope.PartnerInfo.BusinessStaffId = FilterByName($scope.StaffInfo,newVal);
      }
    });

    $scope.$watch("PartnerInfo.ServiceStaff",function (newVal) {
      if(newVal){
        $scope.PartnerInfo.ServiceStaffId = FilterByName($scope.StaffInfo,newVal);
      }
    });

    $scope.SavePartner = function () {
      var filterJson = {"jsonData":JSON.stringify($scope.PartnerInfo)};
      ClientFactory.SetPartner(filterJson).then(function () {
        $.toast("新增成功");
        GetData(1);

      });
    }


    $timeout(function () {
      $(".businessPicker").picker({
        title: "请选择洽谈类型",
        cols: [
          {
            textAlign: 'center',
            values: $scope.TypeItem
          }
        ]
      });
    },1000);


    function GetData(pageIndex) {
    var filter = {
      "accountInfoId":""
      ,"projectInfoIdList":""
      ,"filterProductVersion":""
      ,"filterBusinessStaffId":""
      ,"filterServiceStaffId":""
      ,"searchString":""
      ,"pageSize":"15"
      ,"pageIndex":pageIndex
    };
    var filterStr = JSON.stringify(filter);

    var filterJson = {"filterJson":filterStr}

    ClientFactory.GetCustomerList(filterJson).then(function (data) {
      $scope.RowCount = data.rowCount;
      if(data.Company.length>0){
        if(pageIndex ==1){
          $scope.CustomerList = data.Company;
        }
        else {
          for(var i = 0;i<data.Company.length;i++){
            $scope.CustomerList.push(data.Company[i]);
          }
        }
      }
    });
  }

    function GetDataBySearching(pageIndex,searchString) {
      var filter = {
        "accountInfoId":""
        ,"projectInfoIdList":""
        ,"filterProductVersion":""
        ,"filterBusinessStaffId":""
        ,"filterServiceStaffId":""
        ,"searchString":searchString
        ,"pageSize":"15"
        ,"pageIndex":pageIndex
      };
      var filterStr = JSON.stringify(filter);

      var filterJson = {"filterJson":filterStr}

      ClientFactory.GetCustomerList(filterJson).then(function (data) {
        $scope.SearchList = data.Company;
      });
    }

    function FilterByName(array,name) {
      for(var i = 0;i<array.length;i++){
        if(array[i].Name == name){
          return array[i].Id
        }
      }
    }

     $(document.body).infinite(50);
    var index = 1;
    var loading = false;
    $(document.body).infinite().on("infinite", function() {
      if(loading) {
        return;
      }
      if($scope.RowCount == $scope.CustomerList.length){
        $(document.body).destroyInfinite();
      }
      loading = true;
      setTimeout(function() {
        index ++;
        GetData(index);
        loading = false;
      }, 1500);   //模拟延迟
    });





  });
