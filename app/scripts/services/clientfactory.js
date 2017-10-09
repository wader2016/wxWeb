'use strict';

/**
 * @ngdoc service
 * @name wxWebApp.ClientFactory
 * @description
 * # ClientFactory
 * Service in the wxWebApp.
 */
angular.module('wxWebApp')
  .service('ClientFactory', function ($http,$q,apiUrl) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var factory = {};

    factory.GetCustomerList = function (filter) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/CompanyInfo/GetCustomerList",filter).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    };

    factory.GetAppointmentDetail = function (filterJson) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/TalkRecord/GetAppointment",filterJson).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.GetAppointmentList = function (filterJson) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/TalkRecord/GetAppointmentList",filterJson).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.GetAppointmentDropdownList = function (filterJson) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/TalkRecord/GetAppointmentDropdownList",filterJson).then(function (res) {

        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.SetAppointmentList = function (filterJson) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/TalkRecord/SetAppointment",filterJson).then(function (res) {

        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.SetAppointmentComment = function (commentInfo) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/TalkRecord/SetAppointmentComments",commentInfo).then(function (res) {

        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.SetAccount = function (info) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/WXAccount/SetAccount",info).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.SetAccountInfo = function (info) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/WXAccount/SetAccountInfo",info).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.GetAccountInfo = function (info) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/WXAccount/GetAccountInfo",info).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    factory.GetLocationPoint = function(lat,long){
      var defer = $q.defer();
      $http.post(apiUrl+"api/Map",{"latitude":lat,"longitude":long}).then(function (res) {
        defer.resolve(res);
      });

      return defer.promise;
    }

    factory.SetPartner = function (filterJson) {
      var defer = $q.defer();
      $http.post(apiUrl+"api/CompanyInfo/SetPartner",filterJson).then(function (res) {
        defer.resolve(res.data.Data);
      });

      return defer.promise;
    }

    return factory;

  });
