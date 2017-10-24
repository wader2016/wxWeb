'use strict';

/**
 * @ngdoc function
 * @name wxWebApp.controller:RecorddetailCtrl
 * @description
 * # RecorddetailCtrl
 * Controller of the wxWebApp
 */
angular.module('wxWebApp')
  .controller('RecorddetailCtrl', function ($scope,ClientFactory,$stateParams,localStorageService) {

    $scope.accountInfo = localStorageService.get("AccountInfo");

    var filter = {"appointmentId":$stateParams.Id};

    ClientFactory.GetAppointmentDetail(filter).then(function (data) {
      $scope.AppointmentDetail = data.AppointmentInfo[0];
      $scope.Comments = data.Comments;

    });

    $scope.commentItem = {
      "ACTIONCODE":"A"
      ,"Comments":""
      ,"CreatedBy":$scope.accountInfo.Id
      ,"AppointmentId":$stateParams.Id
    }

    $scope.SendComments = function () {
      var commentInfo = {"jsonData":JSON.stringify($scope.commentItem)};
      ClientFactory.SetAppointmentComment(commentInfo).then(function () {
        $.toast("发送成功");
        ClientFactory.GetAppointmentDetail(filter).then(function (data) {
          $scope.AppointmentDetail = data.AppointmentInfo[0];
          $scope.Comments = data.Comments;
        });

      })
    }






  });
