/**
 * 星星特效
 *
 * @flow
 */
'use strict';
import React, { PureComponent, PropTypes } from 'react';
import {
    View,
    Animated,
    Platform,
    Dimensions,
} from 'react-native';
import Star from '../svg/Star';

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
class AnimatedStar extends PureComponent {
    static propTypes = {
        color:PropTypes.string,
    };

    static defaultProps = {
        color:'#fff',
    };

    constructor(props) {
        super(props);
        this.state = {
            alpha: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this._show();
    }

    render() {
        const {color}=this.props;
        return (
            <Animated.View style={[{position: 'absolute', width:20, height:20,opacity:this.state.alpha}, this.props.style]}>
                <Star color={color} style={{flex:1}}/>
            </Animated.View>
        );
    }

    _show=()=>{
        Animated.sequence([
            Animated.delay(Math.random()*1000+1200),
            Animated.timing(this.state.alpha, {
                duration: 300,
                toValue: 1,
            })
        ]).start(this._hide);
    }

    _hide=()=>{
        Animated.timing(this.state.alpha, {
            duration: 500,
            toValue: 0,
        }).start();
    }
}


export default class StarEffect extends PureComponent {

    constructor(props) {
        super(props);
        this.stars = [];
        this.count=0;
        this.state = {
            count: this.count,
        };
        for(var i=0; i!=12; i++)
        {
            this._addStar();
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                {
                    this.stars.map((v, i)=>{
                        return (
                            <AnimatedStar key={i} style={{ width:v.size, height:v.size, left: v.left, top:v.top, }} />
                        )
                    })
                }
            </View>
        );
    }

    _addStar=()=>{
        if(this.stars.length>20) return;
        this.stars.push({
            top: getRandomNumber(0, 32),
            left: getRandomNumber(0, 32),
            size: getRandomNumber(8, 22),
        });
        this.count++;
        requestAnimationFrame(()=>{
            this.setState({count:this.count});
        });
    }

};
