import React, {PureComponent,PropTypes} from 'react';
import Svg,{
    Circle,
    Ellipse,
    G,
    RadialGradient,
    Use,
    Defs,
    Stop,
    Text,
} from 'react-native-svg';

export default class Bubble extends PureComponent {
    static propTypes = {
        color:PropTypes.string,
        text:PropTypes.string,
    };

    static defaultProps = {
        color:'rgb(255, 255, 255)',
        text:'',
    };
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        const {color, text}=this.props;
        return (
            <Svg height="50" width="50" style={this.props.style}>
                <G id="mediumorchid_group">
                    <Defs>
                        <RadialGradient id="grad" cx="45%" cy="45%" r="60%" fx="45%" fy="45%" fr="50%">
                            <Stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity="0.2"
                            />
                            <Stop
                                offset="66%"
                                stopColor={color}
                                stopOpacity="0.02"
                            />
                        </RadialGradient>
                    </Defs>
                    <Circle cx="25" cy="25" r="25" fill="url(#grad)" />

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
                                stopOpacity="0.02"
                            />
                        </RadialGradient>
                    </Defs>
                    <G rotate="55" origin="18, 8">
                        <Ellipse cx="24" cy="12" rx="12" ry="16" fill="url(#second_grad)" />
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
                        <Ellipse cx="12" cy="7" rx="4" ry="2" fill="url(#third_grad)" />
                    </G>
                    {text&&text.length?<Text
                        fill="#fff"
                        fontFamily="monospace"
                        stroke="#fff"
                        strokeWidth="1"
                        strokeLinecap="round"
                        fontSize="18"
                        x="24"
                        y="14"
                        textAnchor="middle">{text}</Text>:null}
                </G>
                <Use href="#mediumorchid_group"/>
            </Svg>
        );
    }


}