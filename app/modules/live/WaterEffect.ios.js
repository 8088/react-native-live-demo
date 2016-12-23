/**
 * 水波特效
 *
 * @flow
 */
'use strict';
import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    ART,
    View,
    Easing,
    Animated,
    LayoutAnimation,
} from 'react-native';
import Svg,{
    Circle,
    G,
    Path,
    Use,
    Defs,
    ClipPath,
} from 'react-native-svg';

export default class WaterEffect extends Component {
    constructor(props) {
        super(props);
        this._x = -80;
        this._y = 50;
        this.state = {
            animator: new Animated.Value(0),
            waterX: 0,
        };
    }

    deductWater=(value)=>{
        if(value>0){
            let _v = Math.min(60, value);
            if(this._y<60) this._y +=_v;
        }
    }

    hasWater=()=>{
        return this._y<50;
    }


    componentDidMount() {
        this.state.animator.addListener((p) => {
            if(this._x>=-1) this._x = -80;
            else this._x +=0.3;

            requestAnimationFrame(()=>{
                if(this._y>-10){
                    this._y -=0.05;
                    this._ag= true;
                    this.setState({ waterX: -p.value, });
                }
                else{
                    if(this._ag)this.props.callback();
                    this._ag=false;
                }
            });
        });
        this._wave();

    }

    render() {
        return (
            <View style={this.props.style}>
                <Svg height="50" width="50">
                    <Defs>
                        <G id="path" x="0" y={this._y} opacity="1">
                            <Path ref="water1" x={this._x} d="M0,10 C20,10,20,0,40,0 c20,0,20,10,40,10 c20,0,20,-10,40,-10 c20,0,20,10,40,10 V60 H0 V10 Z" fill="rgba(255, 110, 165, .5)" />
                            <Path ref="water2" x={this.state.waterX} d="M0 5 Q 20 -5, 40 5 T 80 5 t 40 0 t 40 0 V60 H0 V5 Z" fill="rgba(255, 110, 165, .8)"/>
                        </G>
                        <ClipPath id="clip">
                            <Circle r="25" cx="25" cy="25" />
                        </ClipPath>
                    </Defs>
                    <Use href="#path" clipPath="url(#clip)" />
                </Svg>
            </View>
        );
    }

    _wave=()=>{
        this.state.animator.setValue(0);

        Animated.timing(this.state.animator, {
            duration: 2000,
            toValue: 79,
        }).start(this._wave);

    }

}