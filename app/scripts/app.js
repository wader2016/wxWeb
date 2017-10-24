'use strict';

/**
 * @ngdoc overview
 * @name wxWebApp
 * @description
 * # wxWebApp
 *
 * Main module of the application.
 */
var app = angular.module('wxWebApp', [
  'ui.router',
  "LocalStorageModule",
  'angular-loading-bar'
  ]);

//app.constant("apiUrl","http://localhost:9035/");
app.constant("apiUrl","http://58.221.60.50:9034/");


app.run(function ($http,$window,$location,localStorageService,$timeout,ClientFactory) {
    // 微信授权 获得用户信息
  var weixin = {
    config: {
      url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7c76be40f55d7c02&redirect_uri=http%3A%2F%2Fwww.itecerp.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
      userInfo:localStorageService.get('MY_USER_INFO'),
      api:'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx7c76be40f55d7c02&secret=6bddcdbdb70341889f507a1e34310009&code='
    },
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    getUser : function(code) {
      $.ajax({
        type: 'get',
        url: "http://www.itecerp.cn/wxApi/api/openId?code="+code,
        cache:false,
        async: false,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(json){
          localStorageService.set('MY_USER_INFO',JSON.parse(json));
          return JSON.parse(json);
        },
        error: function(json) {
          console.log("err",json);
        }
      })
    },
    getUserInfo:function(){

      if(weixin.config.userInfo != null){
        localStorageService.get('MY_USER_INFO');
        return localStorageService.get('MY_USER_INFO');
      }else{
        if(weixin.getQueryString('code') != null){
          weixin.getUser(weixin.getQueryString('code'));
         return localStorageService.get('MY_USER_INFO');
        }else{
          window.location.href = weixin.config.url;
        }
      }

    }
  }

   var userInfo = weixin.getUserInfo();

  $timeout(function () {
    var url =$location.$$absUrl.split("#")[0];
    $http.post("http://www.itecerp.cn/wxApi/api/AccessToken",{"url":url}).then(function (res) {
      $window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx7c76be40f55d7c02',  // 必填，公众号的唯一标识
        timestamp:res.data.timestamp,  // 必填，生成签名的时间戳
        nonceStr:res.data.noncestr,   // 必填，生成签名的随机串
        signature: res.data.signature,               // 必填，签名，见附录1
        jsApiList: [
          "onMenuShareTimeline",      // 分享到朋友圈
          "onMenuShareAppMessage",    // 分享给朋友
          "onMenuShareQQ",            // 分享到QQ
          "onMenuShareWeibo",         // 分享到腾讯微博
          "onMenuShareQZone",         // 分享到QQ空间
          "chooseImage",              // 拍照或从手机相册中选图接口
          "openLocation",             // 使用微信内置地图查看位置接口
          "getLocation",              // 获取地理位置接口
          "scanQRCode"                // 调起微信扫一扫接口
        ]                             // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      // 获取用户信息
      ClientFactory.GetAccountInfo({"openId":localStorageService.get('MY_USER_INFO').openid}).then(function (data) {
        if(data[0].ContactId == 0){
          $location.path("/login");
        }
        else {
          $location.path("/client/clientInfo");
          localStorageService.set("AccountInfo",data[0]);
        }

      });

    })

    wx.error(function(res){
      console.log("微信JS-SDK获取失败");
    });
  },200);

})

app.run(["$rootScope", "$state", function($rootScope,$state) {
  $rootScope.$state = $state;

}]);



/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix("");
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    // .state('main',{
    //   url:'/main',
    //   views:{
    //     '':{
    //       templateUrl:'views/main.html'
    //     },
    //     'tabPage@main':{
    //       templateUrl:'views/home/tabPage1.html'
    //     }
    //   },
    //   data: {pageTitle: '首页'}
    // })
    // .state('tel',{
    //   url:'/tel',
    //   views:{
    //     '':{
    //       templateUrl:'views/main.html'
    //     },
    //     'tabPage@tel':{
    //       templateUrl:'views/home/tabPage2.html'
    //     }
    //   }
    // })
    // .state('detail',{
    //   url:'/tel/detail',
    //   templateUrl:'views/productDetail.html'
    // })
    // .state('find',{
    //   url:'/find',
    //   views:{
    //     '':{
    //       templateUrl:'views/main.html'
    //     },
    //     'tabPage@find':{
    //       templateUrl:'views/home/tabPage3.html'
    //     }
    //   },
    //   data: {pageTitle: '购物车'}
    // })
    // .state('submitOrder',{
    //   url:'/find/submitOrder',
    //   templateUrl:'views/submitorder.html'
    // })
    // .state('me',{
    //   url:'/me',
    //   views:{
    //     '':{
    //       templateUrl:'views/main.html'
    //     },
    //     'tabPage@me':{
    //       templateUrl:'views/home/tabPage4.html'
    //     }
    //   },
    //   data: {pageTitle: '我的'}
    // })
    // .state('order',{
    //   url:'/me/myorder/:tab',
    //   templateUrl:'views/myorder.html'
    // })
    // .state('logistic',{
    //   url:'/me/logistic',
    //   templateUrl:'views/logistics.html'
    // })
    // .state('address',{
    //   url:'/me/address',
    //   templateUrl:'views/address.html'
    // })
    // .state('account',{
    //   url:'/me/account',
    //   templateUrl:'views/account.html',
    //   data: {pageTitle: '个人设置'}
    // })
    .state('login',{
      url:'/login',
      templateUrl:'views/login.html'
    })
    .state('client',{
      url:'/client/clientInfo',
      templateUrl:'views/client/clientInfo.html',
      data: {pageTitle: '客户列表'}
    })
    .state('addClient',{
      url:'/client/addClient',
      templateUrl:'views/client/addClient.html',
      data: {pageTitle: '客户新增'}
    })
    .state('clientDetail',{
      url:'/client/clientDetail/:Id',
      templateUrl:'views/client/clientDetail.html',
      data: {pageTitle: '客户详情'}
    })
    .state('clientInfo',{
      url:'/client/clientDetailInfo',
      templateUrl:'views/client/clientDetailInfo.html',
      data: {pageTitle: '客户信息'}
    })
    .state('addRecord',{
      url:'/client/AddRecord',
      templateUrl:'views/client/AddRecord.html',
      data: {pageTitle: '添加洽谈记录'}
    })
    .state('recordDetail',{
      url:'/client/recordDetail/:Id',
      templateUrl:'views/client/recordDetail.html',
      data: {pageTitle: '洽谈记录'}
    })
}]);




