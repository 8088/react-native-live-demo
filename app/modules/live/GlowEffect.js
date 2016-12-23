import React, {PureComponent,PropTypes} from 'react';
import {
    View,
    Easing,
    Animated,
} from 'react-native';
import Svg,{
    Circle,
    RadialGradient,
    Defs,
    Stop,
} from 'react-native-svg';

export default class Bubble extends PureComponent {
    static propTypes = {
        color:PropTypes.string,
    };

    static defaultProps = {
        color:'#fff',
    };

    constructor(props) {
        super(props);
        this.show=false;
        this.state = {
            alpha: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this._loop();
    }
    render() {
        const {color}=this.props;
        return (
            <Animated.View style={[this.props.style,{opacity:this.state.alpha}]}>
                <Svg height="70" width="70">
                    <Defs>
                        <RadialGradient id="grad" >
                            <Stop
                                offset="90%"
                                stopColor={color}
                                stopOpacity="0"
                            />
                            <Stop
                                offset="30%"
                                stopColor={color}
                                stopOpacity=".4"
                            />
                        </RadialGradient>
                    </Defs>
                    <Circle cx="35" cy="35" r="35" fill="url(#grad)" />
                </Svg>
            </Animated.View>
        );
    }

    _loop=()=>{
        this.show =!this.show;
        Animated.timing(this.state.alpha, {
            duration: 600,
            toValue: this.show?1:0,
        }).start(this._loop);
    }
}