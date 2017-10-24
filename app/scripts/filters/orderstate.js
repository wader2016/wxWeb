"use strict";

/**
 * @ngdoc filter
 * @name wxWebApp.filter:OrderState
 * @function
 * @description
 * # OrderState
 * Filter in the wxWebApp.
 */
angular.module("wxWebApp")
  .filter("OrderState", function () {
    return function (input) {
      if(input=="2"){
        return input="待付款";
      }
      else if(input=="4"){
        return input="待发货";
      }
      else if(input=="8"){
        return input="待发货";
      }
      else if(input=="16"){
        return input="待发货";
      }
      else if(input=="32"){
        return input="待发货";
      }
      else if(input=="64"){
        return input="待发货";
      }
      else if(input=="128"){
        return input="待发货";
      }
      else if(input=="256"){
        return input="待收货";
      }
      else if(input=="512"){
        return input="待评价";
      }

    }
  })
  .filter("FilterStaff",function () {
    return function (input,args) {
      var output = [];
      angular.forEach(input,function (item) {
        if (args == 0){
          if(item.Email1.indexOf(".cn")>0){
            output.push(item);
          }
        }
        else {
          if(item.Email1.indexOf(".com")>0){
            output.push(item);
          }
        }

      })

      return output;
    }
  })
  .filter("DateFilter",function () {
    return function (input) {
      if(input == ""){
        return "";
      }
      var output = "";
      input = input.split(" ").join("T");
      var date = new Date(input);
      var week = "";
      var day = date.getDay();
      if(day == 0){
        week = "周日";
      }
      else if (day == 1){
        week = "周一";
      }
      else if (day == 2){
        week = "周二";
      }
      else if (day == 3){
        week = "周三";
      }
      else if (day == 4){
        week = "周四";
      }
      else if (day == 5){
        week = "周五";
      }
      else if (day == 6){
        week = "周六";
      }

      var month = "";
      if (date.getMonth()+1<10){
        month = "0"+(date.getMonth()+1).toString();
      }
      else {
        month = (date.getMonth()+1).toString();
      }

      var time = date.getDate();

      output = month+"-"+time +" " + week;
      return output;

    }
  })
