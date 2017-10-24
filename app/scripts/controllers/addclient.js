'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:AddclientCtrl
 * @description
 * # AddclientCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('AddclientCtrl', function ($scope,$location,$timeout,ClientFactory) {
    $scope.GetBack = function () {
      $location.path('/client/clientInfo').replace();
    };

    $(document.body).destroyInfinite();

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
      if($scope.PartnerInfo.OrganizationName !=""){
        var filterJson = {"jsonData":JSON.stringify($scope.PartnerInfo)};
        ClientFactory.SetPartner(filterJson).then(function () {
          $.toast("新增成功");

        });
      }
    }

    $timeout(function () {
      $(".businessPicker").picker({
        title: "请选择人员",
        cols: [
          {
            textAlign: 'center',
            values: $scope.TypeItem
          }
        ]
      });
    },1000);

    function FilterByName(array,name) {
      for(var i = 0;i<array.length;i++){
        if(array[i].Name == name){
          return array[i].Id
        }
      }
    }





  });
