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

// app.run(['$document', '$templateCache', function($document, $templateCache) {
//   var scripts = Array.prototype.slice.call($document[0].scripts, 0);
//   scripts.forEach(function(script) {
//     if (script.type === 'text/template') {
//       $templateCache.put(script.id, script.innerHTML);
//     }
//   });
// }])


app.run(function ($http,$window,$location,localStorageService) {
    // 微信授权 获得用户信息
  var weixin = {
    config: {
      url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5418e098ef4dffb4&redirect_uri=http%3A%2F%2Fwww.itecerp.info&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
      userInfo:localStorageService.get('MY_USER_INFO'),
      api:'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx5418e098ef4dffb4&secret=fa7cf01a589eb091ff2a52f9534c1051&code='
    },
    getQueryString: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
      var r = window.location.search.substr(1).match(reg);
      if (r!=null) return unescape(r[2]); return null;
    },
    getUser : function(code) {
      $.ajax({
        type: 'get',
        url: "http://www.itecerp.info:8000/api/openId?code="+code,
        cache:false,
        async: false,
        dataType: 'jsonp',
        jsonp: 'callback',
        success: function(json){
          localStorageService.set('MY_USER_INFO',JSON.parse(json));
          return JSON.parse(json);
        },
        error: function(json) {
          console.log(-1);
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
  //
   var userInfo = weixin.getUserInfo();
    localStorageService.set("userInfo",userInfo);
   console.log(userInfo);
  // console.log(userInfo.nickname);

  //获得用户信息
//  https://api.weixin.qq.com/sns/userinfo?access_token=nlshsMDQ3Rrd5J9kMvZh8XnbQsRnT0jLLxayuKlHXkIS1i_Tb0GrOQX03wlRSNcdd6TxegmDKq0upoTg0PJ7c1hBOngQzwMr6Z_rmd7eXxY&openid=of9k3w0Y4jnx91Bsl0yj6MDlNLs8&lang=zh_CN

  // 授权
  // https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5418e098ef4dffb4&redirect_uri=http%3A%2F%2Fwww.itecerp.info&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect


  var url =$location.$$absUrl.split("#")[0];
  $http.post("http://www.itecerp.info:8000/api/AccessToken",{"url":url}).then(function (res) {
    $window.wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: 'wx5418e098ef4dffb4',  // 必填，公众号的唯一标识
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
  })

  wx.error(function(res){
    alert("微信JS-SDK获取失败");
  });




})

/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix("");
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main',{
      url:'/main',
      views:{
        '':{
          templateUrl:'views/main.html'
        },
        'tabPage@main':{
          templateUrl:'views/home/tabPage1.html'
        }
      }
    })
    .state('tel',{
      url:'/tel',
      views:{
        '':{
          templateUrl:'views/main.html'
        },
        'tabPage@tel':{
          templateUrl:'views/home/tabPage2.html'
        }
      }
    })
    .state('detail',{
      url:'/tel/detail',
      templateUrl:'views/productDetail.html'
    })
    .state('find',{
      url:'/find',
      views:{
        '':{
          templateUrl:'views/main.html'
        },
        'tabPage@find':{
          templateUrl:'views/home/tabPage3.html'
        }
      }
    })
    .state('submitOrder',{
      url:'/find/submitOrder',
      templateUrl:'views/submitorder.html'
    })
    .state('me',{
      url:'/me',
      views:{
        '':{
          templateUrl:'views/main.html'
        },
        'tabPage@me':{
          templateUrl:'views/home/tabPage4.html'
        }
      }
    })
    .state('order',{
      url:'/me/myorder/:tab',
      templateUrl:'views/myorder.html'
    })
    .state('logistic',{
      url:'/me/logistic',
      templateUrl:'views/logistics.html'
    })
    .state('address',{
      url:'/me/address',
      templateUrl:'views/address.html'
    })
}]);


