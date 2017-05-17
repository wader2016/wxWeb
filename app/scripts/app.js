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


