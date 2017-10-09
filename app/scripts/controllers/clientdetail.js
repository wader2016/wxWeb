'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:ClientdetailCtrl
 * @description
 * # ClientdetailCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('ClientdetailCtrl', function ($scope,$stateParams,ClientFactory,localStorageService,$timeout) {

    var filter = {
      "projectInfoIdList":""
      ,"filterAppointmentTypeId":""
      ,"filterStaffId":""
      ,"filterStatusId":""
      ,"filterPartnerId":$stateParams.Id
      ,"searchString":""
      ,"pageSize":""
      ,"pageIndex":""}

      var filterStr = JSON.stringify(filter);
      var filterJson = {"filterJson":filterStr};

    ClientFactory.GetAppointmentList(filterJson).then(function (data) {
      $scope.AppointmentList = data.TalkRecordInfo;
    });
    $scope.TypeItem = [];

    ClientFactory.GetAppointmentDropdownList({"filterJson":{"DropdownList":"Type"}}).then(function (data) {
      $scope.AppointmentType = data;
     for(var i = 0;i<data.length;i++){
       $scope.TypeItem.push(data[i].Name);
     }

    });

    $scope.customerItem = localStorageService.get("customerItem");

    $scope.accountInfo = localStorageService.get("AccountInfo");



    $scope.Appointment = {
     "ACTIONCODE":"A"
    ,"OrganizationId":1
    ,"AppointmentId":""
    ,"StaffId":""//$scope.accountInfo.Id
    ,"PartnerId":$scope.customerItem.Id
    ,"PartnerContactId":""
    ,"AppointmentListId":""
    ,"Code":""
    ,"Subject":""
    ,"Location":""
    ,"Description":""
    ,"StartTime":""
    ,"CloseTime":""
    ,"Type":""
    ,"PartnerContact":""
    ,"NextDate":""
    ,"Duration":""
    ,"NextSubjectCode":""
    ,"Cost":""
    ,"Week":""};

    $scope.$watch("SelectedType",function (newVal) {
      if(newVal){
        $scope.Appointment.Type = FilterByName($scope.AppointmentType,newVal);
      }
    });

    $scope.$watch("NextSelectedType",function (newVal) {
      if(newVal){
        $scope.Appointment.NextSubjectCode = FilterByName($scope.AppointmentType,newVal);
      }
    })

    $scope.AddAppointment = function () {
      $scope.Appointment.CloseTime = GetDateNow();
      $scope.Appointment.Week = GetWeek();

      var filter = {"jsonData":JSON.stringify($scope.Appointment)};

      ClientFactory.SetAppointmentList(filter).then(function (data) {
        $.toast(data.msg);
        ClientFactory.GetAppointmentList(filterJson).then(function (data) {
          $scope.AppointmentList = data.TalkRecordInfo;
        });
      });

    }


    function GetDateNow() {
      var date =  new Date();
      var year = date.getFullYear();
      var month = date.getMonth()+1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();

      return year+"-"+ month+'-'+day+' '+hours+':'+minutes;
    }

    function GetWeek() {
      var str = "";
      var date =  new Date();
      var week = date.getDay();
      switch (week){
        case 1 : str = "周一"
              break;
        case 2 : str = "周二"
              break;
        case 3 : str = "周三"
          break;
        case 4 : str = "周四"
          break;
        case 5 : str = "周五"
          break;
        case 6 : str = "周六"
          break;
        case 7 : str = "周日"
          break;
      }

      return str;

    }

    function FilterByName(array,name) {
      for(var i = 0;i<array.length;i++){
        if(array[i].Name == name){
          return array[i].Id
        }
      }
    }



    $scope.OpenPopup = function () {

      $("#TextRecord").popup();

      $scope.DateNow = GetDateNow();

      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function (res) {
         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          var speed = res.speed; // 速度，以米/每秒计
          var accuracy = res.accuracy; // 位置精度
          ClientFactory.GetLocationPoint(latitude,longitude).then(function (data) {
            $scope.Location = data.data;
            $scope.Appointment.Location = $scope.Location;
          },function () {
            alert("获取失败");
          })
        }
      });
    };

    $timeout(function () {
      $(".servicePicker").picker({
        title: "请选择洽谈类型",
        cols: [
          {
            textAlign: 'center',
            values: $scope.TypeItem
          }
        ]
      });
    },1000);

    $scope.ChoseImgSrc =[];

    $scope.ShowPic = function () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            $scope.localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            wx.getLocalImgData({
              localId: $scope.localIds, // 图片的localID
              success: function (resp) {
                var img =resp.localData.replace('jgp', 'jpeg');  // localData是图片的base64数据，可以用img标签显示
                $scope.ChoseImgSrc.push(img);
              },
              fail:function (e) {
                alert("图片上传失败");
              }
            });

          }
        });
      }


  });
