/**
 * 跑马灯
 *
 * @flow
 */
'use strict';
import React, {PureComponent, PropTypes} from 'react';
import {
    View,
    Text,
    Easing,
    Animated,
    LayoutAnimation,
} from 'react-native';
import Svg,{
    RadialGradient,
    Rect,
    Defs,
    Stop
} from 'react-native-svg';

import Icon from './../../mixins/icons';
import Colors from '../../assets/Colors';
import styles from '../../containers/Live.css';



export default class Marquee extends PureComponent {

    constructor(props) {
        super(props);
        this.count = 0;
        this._width =0;
        this.notices = [];
        this._start = false;
        this.state = {
            count: this.count,
            valueX: new Animated.Value(999),
            opacity: new Animated.Value(0),
            notice: '',
            txt_w: 0,
        };
    }

    addNotice=(info)=>{
        let _t = info.times || 1;
        while(_t!=0){
            this.notices.push(info.txt);
            _t--;
        }
        requestAnimationFrame(()=>{
            const _notice = this.notices.join(' ');
            this.setState({notice:_notice, txt_w: _notice.length*14});
            this.timer = setTimeout(()=>{
                if(!this._start&&_notice.length) this._startAnimation();
            }, 220);
        });
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        var {opacity, valueX, txt_w}=this.state;
        return (
            <Animated.View style={[this.props.style,{opacity:opacity}]} onLayout={this._onLayout}>
                {this._width?<View style={{flex:1, position:'absolute'}}><Svg height="26" width={this._width}>
                    <Defs>
                        <RadialGradient id="grad" cx={this._width*.5} cy="13" rx={this._width*.56} ry="26" fx={this._width*.5} fy="13">
                            <Stop offset="0" stopColor="#333" stopOpacity="0.4" />
                            <Stop offset="1" stopColor="#000" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width={this._width} height="26" fill="url(#grad)" />
                </Svg></View>:null}
                <View style={{flex:1, marginHorizontal: 10, overflow:'hidden', backgroundColor:'transparent',}}>
                    {this.state.notice.length?<Animated.Text style={[styles.marquee_text, {
                        width: txt_w,
                        transform: [
                            {translateX:valueX},
                        ]
                    }]}>{this.state.notice}</Animated.Text>:null}
                </View>
            </Animated.View>
        );
    }

    _onLayout=(evt)=>{
        if (evt.nativeEvent&&evt.nativeEvent.layout) {
            this._width = evt.nativeEvent.layout.width;
        }
    }

    _startAnimation=()=> {
        this._start = true;
        this.state.valueX.setValue(this._width-20);
        Animated.sequence([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                duration: 400,
                easing: Easing.linear,
            }),
            Animated.timing(this.state.valueX, {
                toValue: -this.state.txt_w,
                duration: this.state.txt_w*40,
                easing: Easing.linear,
            })
        ]).start(this._onComplete);
    }


    _onComplete=()=>{
        this.notices = [];
        Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: 400,
            easing: Easing.linear,
        }).start()
    }

}