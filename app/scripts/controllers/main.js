'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wxWebApp
 */

app.controller('MainCtrl', function ($scope,$http,$location,localStorageService,$window) {


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

    $scope.ScanCode = function () {
      $window.wx.ready(function () {
        wx.scanQRCode({
          needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            console.log(res);
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果

          }
        });
        wx.error(function (res) {
          alert(res);
          console.log(res);
        })
      });
    }

    $scope.GetLocation = function () {
      wx.ready(function () {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
          }
        });
      })
    }

    $scope.OpenLocation = function () {
      wx.ready(function () {
        wx.openLocation({
          latitude: 31.98672, // 纬度，浮点数，范围为90 ~ -90
          longitude: 118.7305, // 经度，浮点数，范围为180 ~ -180。
          name: '南京', // 位置名
          address: '瑞泰大厦', // 地址详情说明
          scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
      })
    }

    $scope.GetPicture = function () {
      wx.ready(function () {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
        });
      })
    }

    $scope.ShareToTimeLine = function () {
      wx.ready(function () {
        wx.onMenuShareTimeline({
          title: '测试', // 分享标题
          link: 'http://www.itecerp.cn', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {
            alert("分享成功");
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      })
    }




  });
