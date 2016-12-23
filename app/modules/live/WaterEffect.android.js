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

export default class WaterEffect extends Component {
    constructor(props) {
        super(props);
        this._alpha=0
        this.state = {
            animator: new Animated.Value(this._alpha),
            opacity: this._alpha,
        };
    }

    deductWater=(value)=>{
        if(value>0){
            let _v = Math.min(60, value);
            if(this._alpha>0){
                this._alpha -=_v/60;
                this.state.animator.setValue(this._alpha);
            }
        }
    }

    hasWater=()=>{

        return this._alpha>0.16;
    }


    componentDidMount() {
        this.state.animator.addListener((p) => {

            requestAnimationFrame(()=>{
                if(this._alpha<1){
                    this._alpha +=0.001;
                    this._ag= true;
                    this.setState({ opacity:this._alpha, });
                }
                else{
                    if(this._ag) this.props.callback();
                    this._ag=false;
                }
            });
        });
        this._wave();

    }

    render() {
        return (
            <Animated.View style={[this.props.style, {backgroundColor:'rgba(255, 110, 165, .8)', opacity:this.state.opacity}]}/>
        );
    }

    _wave=()=>{
        this.state.animator.setValue(0);

        Animated.timing(this.state.animator, {
            duration: 20000,
            toValue: 1,
        }).start(this._wave);

    }

}