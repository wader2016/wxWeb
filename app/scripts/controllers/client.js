'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:ClientCtrl
 * @description
 * # ClientCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('ClientCtrl', function ($scope,ClientFactory,$location,localStorageService,$filter) {

    $(".filterItem").click(function (e) {
      e.preventDefault();
      if($(this).hasClass('active')){
        $(this).removeClass('active');
        $($(this).attr("href")).removeClass('show');
        $("#filterBg").css({"display":"none"});
        $("body").css({"position":"static","width":"100%","height":"100%"});
      }
      else {
        $(this).addClass('active').siblings().removeClass('active');
        $($(this).attr("href")).addClass("show").siblings().removeClass('show');
        $("#filterBg").css({"display":"block"});
        $("body").css({"position":"fixed","width":"100%","height":"100%"});

      }
    });

    $(".searchBtn").click(function () {
      if($("#tab51").hasClass('show')){
        $("#tab51").removeClass('show');
        $("#filterBg").css({"display":"none"});
        $("body").css({"position":"static","width":"100%","height":"100%"});
      }
      else {
        $(".filterItem").removeClass('active');
        $("#tab51").addClass('show').siblings().removeClass('show');
        $("#filterBg").css({"display":"block"});
        $("body").css({"position":"fixed","width":"100%","height":"100%"});
      }
    });


    $scope.SearchList = [];

    $scope.Search = function (e) {
     if(e.target.value !=""){
       GetDataBySearching(0,e.target.value);
     }
     else {
       GetDataBySearching(1,e.target.value);
     }
    }

    $scope.CancelSearch = function () {
      $scope.SearchList = [];
      $("#tab51").removeClass('show');
      $("#filterBg").css({"display":"none"});
      $("body").css({"position":"static","width":"100%","height":"100%"});
    }



    $scope.HideList = function (element) {
      $(".filterItem").removeClass('active');
      $(element).removeClass("show");
      $("#filterBg").css({"display":"none"});
      $("body").css({"position":"static","width":"100%","height":"100%"});
    }

    $scope.customerOpen = 1;
    $scope.FilterTitle = "常联系客户";
    $scope.CustomerFilter = function (flag) {
      $scope.ProductFilterList = [];
      $scope.customerOpen = flag;
      if (flag==0){
        $scope.FilterTitle = "不限客户";
      }
      else {
        $scope.FilterTitle = "常联系客户";
      }
    }



    $(".weui-flex__item").click(function () {
      $(".weui-flex__item").removeClass('on');
      $(this).addClass('on').siblings().removeClass('on');
    })

    $scope.ProductVersion = [{"Id":"1000","Nick":"I-完美版"},{"Id":"1001","Nick":"T-旗舰版"},{"Id":"1002","Nick":"E-企业版"},{"Id":"1003","Nick":"C-经典版"}];

    $scope.TypeItem = [];
    ClientFactory.GetAppointmentDropdownList({"filterJson":{"DropdownList":"Staff"}}).then(function (data) {
      $scope.StaffInfo = data;
      for(var i = 0;i<data.length;i++){
        $scope.TypeItem.push(data[i].Name);
      }
    });

    $scope.ProductFilterList = [];

    $scope.ProductFilter = function (flag) {
      $scope.customerOpen = flag;
      if (flag == 2){
        $scope.FilterTitle = "产品版本";
        $scope.ProductFilterList  = $scope.ProductVersion;
      }
      else if (flag == 3){
        $scope.FilterTitle = "业务人员";
        $scope.ProductFilterList = $filter('FilterStaff')($scope.StaffInfo,0);
      }
      else if (flag == 4){
        $scope.FilterTitle = "服务人员";
        $scope.ProductFilterList = $filter('FilterStaff')($scope.StaffInfo,1);
      }

    }


    $scope.CustomerList = [];

    GetData(1);

    $scope.CustomerDetail = function (item) {
      localStorageService.set("customerItem",item);
      $location.path("/client/clientDetail/"+item.Id);
    };

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
