'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:Tabpage2Ctrl
 * @description
 * # Tabpage2Ctrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('Tabpage2Ctrl', function ($scope,$location) {
    $scope.templateModal = "ImgTemplate.html";

    $scope.viewList = true;

    $scope.changeTemplate = function () {
      $scope.viewList = !$scope.viewList;
      if($scope.templateModal == "ImgTemplate.html"){
        $scope.templateModal = "ListTemplate.html";
      }
      else {
        $scope.templateModal = "ImgTemplate.html";
      }
    };

    $scope.LoadDetail = function () {
      $location.path("tel/detail");
    }
  });
