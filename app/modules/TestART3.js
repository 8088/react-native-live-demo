import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    ART,
    View,
    Easing,
    Animated,
    Dimensions,
} from 'react-native';
import ComplementaryShape from './art/ComplementaryShape';

const {
    Shape,
    Group,
    Transform,
    Surface,
    Path,
    Text,
    Pattern,
    LinearGradient,
    RadialGradient,
    ClippingRectangle,
} = ART;

const {
    width,
    height
} = Dimensions.get('window');

function getPaths(){
    var paths =[];
    for(var _a=0;_a!=-80;_a-=10){
        paths.push('M'+_a+' 5 Q '+(20+_a)+' -5, '+(40+_a)+' 5 T '+(80+_a)+' 5 Q '+(100+_a)+' -5, '+(120+_a)+' 5 T '+(160+_a)+' 5 V60 H'+_a+' V5 Z');
    }
    return paths;
}

const PATHS = [
    'M0 5 Q 20 -5, 40 5 T 80 5 Q 100 -5, 120 5 T 160 5 V60 H0 V5 Z',
    'M-10 5 Q 10 -5, 30 5 T 70 5 Q 90 -5, 110 5 T 150 5 V60 H-10 V5 Z',
    'M-20 5 Q 0 -5, 20 5 T 60 5 Q 80 -5, 100 5 T 140 5 V60 H-20 V5 Z',
    'M-30 5 Q -10 -5, 10 5 T 50 5 Q 70 -5, 90 5 T 130 5 V60 H-30 V5 Z',
    'M-40 5 Q -20 -5, 0 5 T 40 5 Q 60 -5, 80 5 T 120 5 V60 H-40 V5 Z',
    'M-50 5 Q -30 -5, -10 5 T 30 5 Q 50 -5, 70 5 T 110 5 V60 H-50 V5 Z',
    'M-60 5 Q -40 -5, -20 5 T 20 5 Q 40 -5, 60 5 T 100 5 V60 H-60 V5 Z',
    'M-70 5 Q -50 -5, -30 5 T 10 5 Q 30 -5, 50 5 T 90 5 V60 H-60 V5 Z',
    'M-80 5 Q -60 -5, -40 5 T 0 5 Q 20 -5, 40 5 T 80 5 V60 H-80 V5 Z',
]

export default class TestART2 extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };

    }

    componentWillMount() {
        this._current = 1;
    }

    componentDidMount() {

    }

    render() {
        return (
            <View style={this.props.style}>
                <Surface width={50} height={50} style={{backgroundColor:'transparent'}} >
                    <ComplementaryShape ds={PATHS} loop={true} fill="rgba(255,0,0,.5)" />
                </Surface>
            </View>
        );
    }

}