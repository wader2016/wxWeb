'use strict';

/**
 * @ngdoc filter
 * @name wxWebApp.filter:OrderState
 * @function
 * @description
 * # OrderState
 * Filter in the wxWebApp.
 */
angular.module('wxWebApp')
  .filter('OrderState', function () {
    return function (input) {
      if(input=='2'){
        return input='待付款';
      }
      else if(input=="4"){
        return input='待发货';
      }
      else if(input=="8"){
        return input='待发货';
      }
      else if(input=="16"){
        return input='待发货';
      }
      else if(input=="32"){
        return input='待发货';
      }
      else if(input=="64"){
        return input='待发货';
      }
      else if(input=="128"){
        return input='待发货';
      }
      else if(input=="256"){
        return input='待收货';
      }
      else if(input=="512"){
        return input='待评价';
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
