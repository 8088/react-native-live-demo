import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from './../mixins/icons';
import Colors from '../assets/Colors';
import BaseHeader from '../components/BaseHeader';
export default class Topbar extends BaseHeader {
  static propTypes = {
    isShowStatuBar:PropTypes.bool,
  };
  static defaultProps = {
    isShowStatuBar:true
  };
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    var {color, backgroundColor,isShowStatuBar}=this.props;
    var h_n = 50+(isShowStatuBar?this.statuBarHeight:0);
    var back_iconcolor = this.props.color ? this.props.color : 'white';
    var background_color = backgroundColor? backgroundColor : Colors.main;
    this.getRenderHeader();
    return (
      <View style={[styles.topbar, { backgroundColor:background_color,height:h_n }, this.props.style]}>
        <View style={[styles.left,{marginTop:isShowStatuBar?this.statuBarHeight:0}]}>
          {this.props.navigator?<TouchableOpacity
            onPress={this._onPress}
            style={[styles.button, {paddingLeft: 12,}]}>
            <Text style={styles.button_lable}>
              <Icon name='common-fanhui' size={20} color={back_iconcolor}/>
            </Text>
          </TouchableOpacity>:null}
        </View>
        <TouchableOpacity
          onPress={this._callBack}
          style={[styles.middle,{marginTop:isShowStatuBar?this.statuBarHeight:0}]}>
          <Text numberOfLines={1} style={[styles.title, {color: back_iconcolor}]}>{this.props.title}</Text>
        </TouchableOpacity>
        <View style={[styles.right,{marginTop:isShowStatuBar?this.statuBarHeight:0}]}/>
      </View>
    );
  }
  _callBack=()=>{
    if(this.props._scollorTop){
      this.props._scollorTop()
    }
  }
  _onPress=()=>{
    requestAnimationFrame(()=>{
      this.props.navigator.pop();
    })
  }
}

const styles = StyleSheet.create({
    topbar: {
        height: 50,
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,.15)',
        flexDirection: "row",
    },
    left: {
        flex: 1,
    },
    middle: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    right: {
        flex: 1,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    button_lable: {
        fontSize: 16,
        color: '#999',
    },
    title: {
        color: 'black',
        fontSize: 18,
    },

});
