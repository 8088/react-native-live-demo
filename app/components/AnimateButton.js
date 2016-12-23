import React, {Component} from 'react';
import {
    StyleSheet,
    Animated,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    ART,
    Dimensions
} from 'react-native';

import Morph from 'art/morph/path';

let {
    Surface,
    Shape,

    LinearGradient,
    RadialGradient,
    Pattern,
    Transform,
    Path,
    Group,
    ClippingRectangle,
    Text

} = ART;


let BatmanLogoSVGs = [
    'M 10,0 L 90,0 M 10,40 L 90,40 M 10,80 L 90,80',
    'M 10,40 L 40,0 M 10,40 L 90,40 M 10,40 L 40,80',
    'M 10,0 L 90,0 M 10,40 L 90,40 M 10,80 L 90,80'
];

var BatmanLogoPaths = BatmanLogoSVGs.map((svg) => Morph.Path(svg));

export default class AnimateButton extends Component {
    constructor (props) {
        super(props);

        this.state = {
            transition: Morph.Tween(BatmanLogoPaths[0], BatmanLogoPaths[1]),
        };

        this._current = 1;
    }

    nextAnimation = () => {
        console.log('do next animation');

        this._current += 1;
        if (this._current >= BatmanLogoPaths.length) {
            return;
        }

        this.setState({
            transition: Morph.Tween(BatmanLogoPaths[this._current - 1], BatmanLogoPaths[this._current])
        });

        this.animate(null, this.nextAnimation);
    };

    animate (start, callback) {
        requestAnimationFrame((timestamp) => {
            if (!start) {
                start = timestamp;
            }

            let delta = (timestamp - start) / 500;

            if (delta > 1) {
                return callback();
            }

            this.state.transition.tween(delta);
            this.setState(this.state);
            this.animate(start, callback);
        });

    }

    render () {
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.animate(null, this.nextAnimation)
                    }}
                >
                    <View style={{flex: 1, backgroundColor: '#fff'}}>
                        <Surface width={100} height={100}>
                            <Shape
                                x={0}
                                y={2}
                                d={this.state.transition}
                                stroke="#000000"
                                strokeWidth="2"
                            />
                        </Surface>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}