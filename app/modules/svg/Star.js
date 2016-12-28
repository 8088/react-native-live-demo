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
    };

    static defaultProps = {
        color:'rgb(255, 255, 255)',
    };
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        const {color}=this.props;
        return (
            <Svg height="100%" width="100%" style={this.props.style}>
                <G id="star_group">
                    <Defs>
                        <RadialGradient id="glow">
                            <Stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity="0" />
                            <Stop
                                offset="30%"
                                stopColor={color}
                                stopOpacity="0.1" />
                            <Stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity="0.6" />
                        </RadialGradient>
                    </Defs>
                    <Circle cx="50%" cy="50%" r="50%" fill="url(#glow)" />
                    <Defs>
                        <RadialGradient id="line1">
                            <Stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity="0" />
                            <Stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity="0.8" />
                        </RadialGradient>
                    </Defs>
                    <Ellipse fill="url(#line1)" cx="50%" cy="50%" rx="40%" ry="4%"/>
                    <Defs>
                        <RadialGradient id="line2">
                            <Stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity="0" />
                            <Stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity="0.8" />
                        </RadialGradient>
                    </Defs>
                    <Ellipse fill="url(#line2)" cx="50%" cy="50%" rx="5%" ry="50%"/>
                </G>
                <Use href="#star_group"/>
            </Svg>
        );
    }


}