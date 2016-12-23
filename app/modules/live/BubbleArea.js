/**
 * 泡泡区
 *
 * @flow
 */

import React, { PureComponent, PropTypes } from 'react';
import {
    Text,
    View,
    Animated,
    Platform,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import Svg,{
    Ellipse,
    G,
    RadialGradient,
    Line,
    Path,
    Defs,
    Stop,
} from 'react-native-svg';

import Bubble from '../svg/Bubble';
import GlowEffect from './GlowEffect';
import BubbleEffect from './BubbleEffect';
import WaterEffect from './WaterEffect';
import Icon from '../../mixins/icons';
import Colors from '../../assets/Colors';
import styles from '../../containers/Live.css';

var {
    width: deviceWidth,
    height: deviceHeight
} = Dimensions.get('window');
var ANIMATION_END_Y = Math.ceil(deviceHeight * .6);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
class AnimatedBonus extends PureComponent
{
    static propTypes = {
        onComplete:PropTypes.func,
    };

    static defaultProps = {
        onComplete: ()=> {},
    };

    constructor(props) {
        super(props);
        this.state = {
            position: new Animated.Value(0),
            text: '积分+1',
        };
    }

    componentWillMount() {
        this._yAnimation = this.state.position.interpolate({
            inputRange: [NEGATIVE_END_Y, 0],
            outputRange: [ANIMATION_END_Y, 0]
        });

        this._opacityAnimation = this._yAnimation.interpolate({
            inputRange: [0, ANIMATION_END_Y/2, ANIMATION_END_Y],
            outputRange: [1, .8, 0]
        });

        this._scaleAnimation = this._yAnimation.interpolate({
            inputRange: [-1, 40, 50],
            outputRange: [0, 1.2, 1],
            extrapolate: 'clamp'
        });

    }

    componentDidMount() {
        Animated.sequence([
            Animated.timing(this.state.position, {
                duration: 500,
                toValue: -50,
            }),
            Animated.timing(this.state.position, {
                duration: 3000,
                toValue: NEGATIVE_END_Y
            }),
        ]).start(this.props.onComplete);
    }

    render() {
        return (
            <Animated.View style={[{position: 'absolute', bottom: 20, right:5, height:96, width:60,backgroundColor:'transparent'}, this._getAnimationStyle()]}>
                <Svg width="60" height="96" style={{backgroundColor:'transparent',position: 'absolute',}}>
                    <Path fill="#EC651A" d="M30,6.223C44.118-6.715,60,2.93,60,16.59c0,10.827-8.333,20.66-28.701,36.462c0,0,5.576,3.323,4.576,4.323
        s-1.75-0.5-2.75,0S32.875,58.75,31,58.75s-1.75-1-2.5-1.125s-2,0.75-2.25-0.25S29.375,53,29.375,53C13.375,41.125,0,27.625,0,16.5
        C0,2.25,17.5-6.375,30,6.223z"/>
                    <Defs>
                        <RadialGradient id="second_grad" cx="80%" cy="50%" r="80%" fx="100%" fy="50%" fr="50%">
                            <Stop
                                offset="90%"
                                stopColor="#fff"
                                stopOpacity="0.2"
                            />
                            <Stop
                                offset="50%"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </RadialGradient>
                    </Defs>
                    <G rotate="55" origin="18, 8">
                        <Ellipse cx="20" cy="14" rx="11" ry="15" fill="url(#second_grad)" />
                    </G>
                    <Defs>
                        <RadialGradient id="third_grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" fr="50%">
                            <Stop
                                offset="20%"
                                stopColor="#fff"
                                stopOpacity=".8"
                            />
                            <Stop
                                offset="100%"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </RadialGradient>
                    </Defs>
                    <G rotate="-40" origin="16, 8">
                        <Ellipse cx="11" cy="5" rx="4" ry="2" fill="url(#third_grad)" />
                    </G>
                    <Defs>
                        <RadialGradient id="third_grad" cx="40%" cy="60%" r="50%" fx="40%" fy="60%" fr="50%">
                            <Stop
                                offset="20%"
                                stopColor="#fff"
                                stopOpacity=".8"
                            />
                            <Stop
                                offset="100%"
                                stopColor="#fff"
                                stopOpacity="0"
                            />
                        </RadialGradient>
                    </Defs>
                    <G rotate="-45" >
                        <Ellipse cx="10" cy="55" rx="16" ry="1" fill="url(#third_grad)" fillOpacity=".1" />
                    </G>
                    <Path fill="none" stroke="#EEEEEE" stroke-width="2" stroke-miterlimit="10" d="M28.587,53.003c0.9,0.683,3.163,0.468,3.753,0"/>
                    <Path fill="none" stroke="#EEEEEE" stroke-miterlimit="10" d="M30.464,53.221c0.036-0.142,0,14.851,0,19.801"/>
                    <G>
                        <Path fill="#E55B8D" stroke="#F0A1BE" stroke-miterlimit="10" d="M31.134,95.072c-1.005,0.787-2.334,0.766-2.969-0.044
            l-8.998-11.501c-0.636-0.811-0.334-2.105,0.67-2.892l9.029-7.064c1.006-0.786,2.335-0.767,2.97,0.043l8.999,11.502
            c0.634,0.81,0.333,2.105-0.672,2.892L31.134,95.072z"/>
                        <Line fill="#E55B8D" stroke="#F0A1BE" stroke-miterlimit="10" x1="26.652" y1="75.239" x2="22.622" y2="88.136"/>
                        <Line fill="#E55B8D" stroke="#F0A1BE" stroke-miterlimit="10" x1="32.055" y1="73.725" x2="26.201" y2="92.458"/>
                        <Line fill="#E55B8D" stroke="#F0A1BE" stroke-miterlimit="10" x1="38.764" y1="82.415" x2="35.951" y2="91.417"/>
                        <Line fill="#E55B8D" stroke="#F0A1BE" stroke-miterlimit="10" x1="35.303" y1="78.022" x2="29.854" y2="95.458"/>
                    </G>
                </Svg>
                <Text style={{color:'#fff', marginTop:10, marginHorizontal: 10, textAlign:'center',}}>{this.state.text}</Text>
            </Animated.View>
        )
    }

    _getAnimationStyle=()=>{
        return {
            transform: [
                {translateY: this.state.position},
                {scale: this._scaleAnimation},
            ],
            opacity: this._opacityAnimation
        }
    }
}

export default class BubbleArea extends PureComponent {

    constructor(props) {
        super(props);
        this.count=0;
        this.state = {
            glow: false,
            bonus: false,
        };
    }

    componentDidMount() {
        this.bubbles = this.refs['bubbles'];
        this.water = this.refs['water'];
    }

    addBubble=()=>{
        this.bubbles&&this.bubbles.addBubble();
    }

    render() {
        return (
            <View style={this.props.style}>
                <BubbleEffect ref='bubbles' style={styles.flex_1}/>
                {this.state.bonus?<AnimatedBonus onComplete={this._removeBonus}/>:null}


                <TouchableOpacity activeOpacity={.9} style={styles.add_bubble_btn} onPress={this._onPress}>
                    <WaterEffect ref='water' style={styles.add_bubble_btn_view} callback={this._onWaterFull}/>
                    <Bubble style={styles.add_bubble_btn_view}/>
                    {this.state.glow?<GlowEffect style={{position:'absolute'}}/>:null}
                    <View style={[styles.flex_1, styles.align_center, styles.align_v_center]}>
                        <Icon name={'launcher'} size={22} color={Colors.white} style={{backgroundColor:'transparent', paddingTop:2,}}/>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _onPress=()=>{
        if(this.water&&this.water.hasWater()){
            this.count++;
            if(this.state.glow){
                this._addBonus();
                this.water.deductWater(60);
                requestAnimationFrame(()=>{
                    this.setState({glow:false});
                });
            }
            else{
                this.water.deductWater(4);
                if(this.water)this.addBubble();
            }
        }
    }

    _onWaterFull=()=>{
        requestAnimationFrame(()=>{
            if(!this.state.glow)this.setState({glow:true});
        });
    }


    _addBonus=()=>{
        requestAnimationFrame(()=>{
            this.setState({bonus:true});
        });


        //mark: 通知外部请求接口
        this.props.callback&&this.props.callback(this.count);
        this.count=0;
    }

    _removeBonus=()=>{
        requestAnimationFrame(()=>{
            this.setState({bonus:false});
        });
    }

};
