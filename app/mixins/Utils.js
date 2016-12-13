import React from 'react';
import {
    PixelRatio,
    Dimensions,
} from 'react-native';
const Util = {
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    domain : 'http://api.jinsque.com/',
    popToRoute(navigatorObj,routeObj){
      var routes = navigatorObj.state.routeStack;
      for (var i = routes.length - 1; i >= 0; i--) {
        if(routes[i].id === routeObj.id){
          var destinationRoute = navigatorObj.getCurrentRoutes()[i];
          for(o in routeObj){
            destinationRoute[o] = routeObj[o];
          };
          navigatorObj.popToRoute(destinationRoute);
        }
      }
    },
    immediatelyResetRouteStack(navigatorObj,rountId,routeObj){
      var routes = navigatorObj.state.routeStack;
      var newRoute = [];
      for (var i = routes.length - 1; i >= 0; i--) {
        if(routes[i].id !== rountId){
          var newRoute_child = navigatorObj.getCurrentRoutes()[i];
          newRoute.push(newRoute_child);
        }
      };
      newRoute.reverse();
      newRoute.push(routeObj);
      navigatorObj.immediatelyResetRouteStack(newRoute);
    },
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    get(url,callback){
      fetch(url)
          .then(res => res.json())
          .then(res => {
              callback(res);
          }).catch(function(err){
            callback({errorCode:-99,errorMsg:err});
          })
          .done();
    },
    post(url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: 'data='+JSON.stringify(data)+''
        };

        fetch(url, fetchOptions)
            .then((response) => {
                return response.text();
            })
            .then((responseData) => {
                callback(responseData);
            });
    },
    key: 'REACT-NATIVE-TEAM',
    isNative(){
        return !window.location;
    },
    trim(str){
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;



/**
 * 扩展Date对象，将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * (new Date()).format("yyyy-MM-dd")            ==> 2016-09-28
 * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2016-09-28 08:09:04.423
 * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2016-9-28 8:9:4.18
 * @param mode
 * @returns {Sting}
 * @constructor
 */
Date.prototype.format = function (mode) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(mode)) mode = mode.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(mode)) mode = mode.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return mode;
}
/**
 * 扩展String对象，将String格式的日期 转化为 Date 对象
 * 例子：
 * var date = ("2016-09-28").format(); console.log(date.getDate())              ===> 2
 * var time = ("2016-09-28 20:45:17").format(); console.log(time.getMinutes())  ===> 45
 * @returns {Date}
 * @constructor
 */
String.prototype.toDate = function () {
    var str = this.toString();
    str = str.replace(/-/g,"/");
    return new Date(str);
}
