'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:ClientdetailCtrl
 * @description
 * # ClientdetailCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('ClientdetailCtrl', function ($scope,$stateParams,ClientFactory,localStorageService) {

    $scope.customerItem = localStorageService.get("customerItem");

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


  });
