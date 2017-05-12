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
  'oc.lazyLoad',
  "LocalStorageModule",
  'angular-loading-bar'
  ]);



/* Setup Rounting For All Pages */
app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider,$locationProvider) {
  $locationProvider.hashPrefix("");
  $urlRouterProvider.otherwise("/main");
  $stateProvider
    .state('main',{
      url:'/main',
      views:{
        '':{
          templateUrl:'views/main.html',
        },
        'tabPage@main':{
          templateUrl:'views/home/tabPage1.html',
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:app,
            files: [

            ]
          });
        }]
      }
    })
    .state('tel',{
      url:'/tel',
      views:{
        '':{
          templateUrl:'views/main.html',
        },
        'tabPage@tel':{
          templateUrl:'views/home/tabPage2.html',
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:app,
            files: [
              'scripts/controllers/main.js'
            ]
          });
        }]
      }
    })
    .state('find',{
      url:'/find',
      views:{
        '':{
          templateUrl:'views/main.html',
        },
        'tabPage@find':{
          templateUrl:'views/home/tabPage3.html',
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:app,
            files: [
              'scripts/controllers/main.js'
            ]
          });
        }]
      }
    })
    .state('me',{
      url:'/me',
      views:{
        '':{
          templateUrl:'views/main.html',
        },
        'tabPage@me':{
          templateUrl:'views/home/tabPage4.html',
        }
      },
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            name:app,
            files: [
              'scripts/controllers/main.js'
            ]
          });
        }]
      }
    })
}]);


