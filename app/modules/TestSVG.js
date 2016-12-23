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
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop,
    ClipPath,
} from 'react-native-svg';

export default class TestSVG extends Component {
    constructor(props) {
        super(props);
        this._x = -80;
        this._y = 50;
        this.state = {
            animator: new Animated.Value(0),
            waterX: 0,
        };
    }

    deduct=(value)=>{
        if(value>0){
            let _v = Math.min(50, value);
            if(this._y<60) this._y +=value;
        }
    }


    componentDidMount() {
        this.state.animator.addListener((p) => {
            if(this._x>=-1) this._x = -80;
            else this._x +=0.3;

            requestAnimationFrame(()=>{
                if(this._y>-10){
                    this._y -=0.05;
                    this.setState({ waterX: -p.value, });
                }
                else{
                    //TODO:水满了 闪烁提示用户
                }
            });
        });
        this._wave();

    }

    render() {
        return (
            <View style={this.props.style}>

                <Svg height="100" width="100">
                    <G id="mediumorchid_group">
                        <Defs>
                            <RadialGradient id="grad" cx="45%" cy="45%" r="50%" fx="44%" fy="44%" fr="49%">
                                <Stop
                                    offset="100%"
                                    stopColor="#fff"
                                    stopOpacity="0.25"
                                />
                                <Stop
                                    offset="88%"
                                    stopColor="#fff"
                                    stopOpacity="0.15"
                                />
                            </RadialGradient>
                        </Defs>
                        <Circle cx="25" cy="25" r="25" fill="url(#grad)" />

                        <Defs>
                            <RadialGradient id="second_grad" cx="70%" cy="50%" rx="73%" ry="60%" fx="56%" fy="54%" fr="60%">
                                <Stop
                                    offset="80%"
                                    stopColor="#fff"
                                    stopOpacity="0.03"
                                />
                                <Stop
                                    offset="100%"
                                    stopColor="#fff"
                                    stopOpacity="0.1"
                                />
                            </RadialGradient>
                        </Defs>
                        <G rotate="50" origin="18, 8">
                            <Ellipse cx="25" cy="12.5" rx="12" ry="16" fill="url(#second_grad)" />
                        </G>
                        <Defs>
                            <RadialGradient id="third_grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <Stop
                                    offset="10%"
                                    stopColor="#fff"
                                    stopOpacity="0.7"
                                />
                                <Stop
                                    offset="100%"
                                    stopColor="#fff"
                                    stopOpacity="0.1"
                                />
                            </RadialGradient>
                        </Defs>
                        <G rotate="-40" origin="16, 8">
                            <Ellipse cx="12" cy="8" rx="4" ry="2" fill="url(#third_grad)" />
                        </G>
                        <Defs>
                            <LinearGradient id="text_grad" x1="50%" y1="0%" x2="100%" y2="0%">
                                <Stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
                                <Stop offset="100%" stopColor="white" stopOpacity="0.6" />
                            </LinearGradient>
                        </Defs>
                        <Defs>
                            <LinearGradient id="text_stroke" x1="50%" y1="0%" x2="100%" y2="0%">
                                <Stop offset="80%" stopColor="#fff" stopOpacity="0" />
                                <Stop offset="100%" stopColor="mediumorchid" stopOpacity="0.2" />
                            </LinearGradient>
                        </Defs>
                    </G>
                    <Use href="#mediumorchid_group"/>
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