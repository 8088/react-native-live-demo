/**
 * 气泡特效
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
} from 'react-native';

var {
    width: deviceWidth,
    height: deviceHeight
} = Dimensions.get('window');

var ANIMATION_END_Y = Math.ceil(deviceHeight * .6);
var NEGATIVE_END_Y = ANIMATION_END_Y * -1;
var startCount = 0;
var colors = ['#FF0000','#FF00FF','#0090FF','#00F0FF','#FF0000','#00FF00','#FFEE00','#FF9000','#90FF00','#FF0090'];
var txts =[ '', 'mi', 'li', '', '']

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomColor() {
    return colors[Math.ceil(Math.random()*10)];
}
function getRandomTxt() {
    return txts[Math.ceil(Math.random()*5)];
}

class Bubble extends PureComponent
{
    static propTypes = {
        color:PropTypes.string,
    };

    static defaultProps = {
        color:'rgba(255, 255, 255, .2)'
    };

    render() {
        var { color, }=this.props;
        return (
            <View {...this.props} style={[{
                width:40,
                height:40,
                justifyContent: 'center',
                alignItems: 'center',}, this.props.style]}>
                <View style={{
                    position: 'absolute',
                    width:40,
                    height:40,
                    backgroundColor:color,
                    borderRadius:20,
                    opacity: .6,
                    top: 0,
                    left: 0,
                }}/>
                <Text style={{color:'#fff', fontWeight:'bold'}}>{getRandomTxt()}</Text>
            </View>
        )
    }
}

class AnimatedBubble extends PureComponent
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
            position: new Animated.Value(0)
        };
    }

    componentWillMount() {
        this._yAnimation = this.state.position.interpolate({
            inputRange: [NEGATIVE_END_Y, 0],
            outputRange: [ANIMATION_END_Y, 0]
        });

        this._opacityAnimation = this._yAnimation.interpolate({
            inputRange: [0, ANIMATION_END_Y],
            outputRange: [1, 0]
        });

        this._scaleAnimation = this._yAnimation.interpolate({
            inputRange: [-1, 40, 50],
            outputRange: [0, 1.2, Math.random()+0.5],
            extrapolate: 'clamp'
        });

        this._xAnimation = this._yAnimation.interpolate({
            inputRange: [0, 50, ANIMATION_END_Y/2, ANIMATION_END_Y],
            outputRange: [0, 0, getRandomNumber(-100, 100), 0]
        })

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
            <Animated.View style={[{position: 'absolute', bottom: 0, backgroundColor: 'transparent',}, this._getAnimationStyle(), this.props.style]}>
                <Bubble color={this.props.color}/>
            </Animated.View>
        )
    }

    _getAnimationStyle=()=>{
        return {
            transform: [
                {translateY: this.state.position},
                {translateX: this._xAnimation},
                {scale: this._scaleAnimation},
            ],
            opacity: this._opacityAnimation
        }
    }
}

export default class BubbleEffect extends PureComponent {

    constructor(props) {
        super(props);
        this.bubbles = [];
        this.count=0;
        this.state = {
            count: this.count,
        };
    }

    addBubble=()=>{
        if(Platform.OS==='android'&&this.bubbles.length>20) return;
        this.bubbles.push({
            id: this.state.count+(new Date()*1),
            right: getRandomNumber(10, 30),
            color: getRandomColor(),
        });
        this.count++;
        requestAnimationFrame(()=>{
            this.setState({count:this.count});
        });
    }

    render() {
        return (
            <View style={this.props.style}>
                {
                    this.bubbles.map((v, i)=>{
                        return (
                            <AnimatedBubble
                                key={v.id}
                                onComplete={()=>this._removeBubble(v.id)}
                                style={{right: v.right,}}
                                color={v.color}
                            />
                        )
                    })
                }
            </View>
        );
    }

    _removeBubble=(id)=>{
        var index = this.bubbles.findIndex((bubble)=> bubble.id === id);
        this.bubbles.splice(index, 1);
    }
};
