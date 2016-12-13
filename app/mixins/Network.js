/**
 * Network 网络请求
 *
 * https://github.com/facebook/react-native
 */
import React, { PureComponent, PropTypes} from 'react';
import {
    Alert,
    NetInfo,
    AsyncStorage,
} from 'react-native';
import ErrorCode from '../mixins/ErrorCode.json';
function objectToString(obj) {
    var quest = obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            var temp = encodeURIComponent(key)+ '=[';
            temp +=  val.sort().map(function (val2) {
                return JSON.stringify(val2);
            }).join(',');
            return temp +=']';
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
    // console.log('POST: '+quest);
    return quest;
}

export default class Network extends PureComponent {

    static post(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: objectToString(data),
        };

        let reach = Network.info;
        if(reach==='none'||reach==='NONE'||reach==='UNKNOWN'||reach==='unknown'){
            // Network._postFethData(url,fetchOptions, callback);
            Alert.alert(
                '提示',
                '网络信号走丢了！\n小米粒快检查一下~',
                [{text: '确定', onPress: () => {}}]
            )
        }else if(reach==='cell'||reach==='MOBILE'){
          AsyncStorage.getItem('isUseExpensive',function(errs,result){
            if(errs===null&&result==='1'){
              Network._postFethData(url,fetchOptions, callback);
            }else{
              Alert.alert(
                  '确认',
                  '网络处于移动网络,是否要继续?',
                  [
                      {text: '取消', onPress: () => {}},
                      {text: '确定', onPress: () => {
                        try {
                          AsyncStorage.setItem('isUseExpensive', '1');
                          Network._postFethData(url,fetchOptions, callback);
                        } catch (error) {

                        }
                      }},
                  ]
              );
            }
          });
        }else{
            Network._postFethData(url,fetchOptions, callback);
        }
    }

    static info='';
    static postJson(url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(url, fetchOptions)
            .then((res) => res.text())
            .then((res) => {
                callback(res);
            })
            .catch((error) => {
                alert(error);
            })
            .done();
    }
    static get(url, callback) {
        let reach = Network.info;
        if(reach==='none'||reach==='NONE'||reach==='UNKNOWN'||reach==='unknown'){
            callback({errorCode:-100,errorMsg:'网络信号走丢了！\n小米粒快检查一下~'});
        }else if((reach==='cell'||reach==='MOBILE')){
          AsyncStorage.getItem('isUseExpensive',function(errs,result){
            if(errs===null&&result==='1'){
              Network._getFethData(url, callback);
            }else{
              Alert.alert(
                  '确认',
                  '网络处于移动网络,是否要继续?',
                  [
                      {text: '取消', onPress: () => {}},
                      {text: '确定', onPress: () => {
                        try {
                          AsyncStorage.setItem('isUseExpensive', '1');
                          Network._getFethData(url, callback);
                        } catch (error) {

                        }
                      }},
                  ]
              );
            }
          });
        }else{
          Network._getFethData(url, callback);
        }
    }
    static _postImageUpload(callback){
      let reach = Network.info;
      if(reach==='none'||reach==='NONE'||reach==='UNKNOWN'||reach==='unknown'){
          Alert.alert(
              '提示',
              '网络信号走丢了！\n小米粒快检查一下~',
              [{text: '确定', onPress: () => {}}]
          )
      }else if((reach==='cell'||reach==='MOBILE')){
        AsyncStorage.getItem('isUseExpensive',function(errs,result){
          if(errs===null&&result==='1'){
            callback();
          }else{
            Alert.alert(
                '确认',
                '网络处于移动网络,是否要继续?',
                [
                    {text: '取消', onPress: () => {}},
                    {text: '确定', onPress: () => {
                      try {
                        AsyncStorage.setItem('isUseExpensive', '1');
                        callback();
                      } catch (error) {

                      }
                    }},
                ]
            );
          }
        });
      }else{
        callback();
      }
    }
    static _getFethData(url, callback){
      fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch((err) => {
          Alert.alert(
              '提示',
              // err
              '数据处于异常状态,小米粒赶快联系工作人员~~'+err,
              [{text: '确定', onPress: () => {}}]
          )
          // callback({errorCode:-99,errorMsg:err});
        })
        .done();
    }
    static _postFethData(url,fetchOptions, callback){
      fetch(url, fetchOptions)
        .then(res => res.json())
        .then(res => {
            if(res.errorCode===0){//当返回errorCode===0 即为操作正常且数据提交成功,执行回调函数
              callback(res);
            }else{
              var errorMsg = ErrorCode[res.errorCode]?ErrorCode[res.errorCode]:res.errorMsg;
              Alert.alert(
                  '提示',
                  errorMsg,
                  [{text: '确定', onPress: () => {}}]
              )
            }
        })
        .catch(function(err){
          Alert.alert(
              '提示',
              // err
              '数据处于异常状态,小米粒赶快联系工作人员~~'+err,
              [{text: '确定', onPress: () => {}}]
          )
          // callback({errorCode:-99,errorMsg:err});
        })
        .done();
    }
}
