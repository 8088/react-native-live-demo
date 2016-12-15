import React, {Component,PropTypes} from 'react';
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
    Stop
} from 'react-native-svg';

export default class TestSVG extends Component {
    render() {
        return (
            <Svg height="100" width="300">
                <Defs>
                    <RadialGradient id="grad" cx="150" cy="15" rx="150" ry="30" fx="180" fy="15">
                        <Stop offset="0" stopColor="#000" stopOpacity="0.3" />
                        <Stop offset="1" stopColor="#000" stopOpacity="0" />
                    </RadialGradient>
                </Defs>
                <Rect x="0" y="0" width="300" height="30" fill="url(#grad)" />
            </Svg>
        );
    }
}