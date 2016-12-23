import React, {Component,PropTypes} from 'react';
import {
    StyleSheet,
    ART,
    View,
    Easing,
    Animated,
} from 'react-native';
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
const AnimatedShape = Animated.createAnimatedComponent(Shape);
export default class TestART extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animator: new Animated.Value(0),
            _a:0
        };

    }

    componentDidMount() {

        this.water2 = this.refs['water2'];
        /*
        this.state.animator.addListener((p) => {
            requestAnimationFrame(()=>{
                this.setState({ _a: p.value, });
            });
        });*/
        this._loop();

        this._timer = setInterval(()=>{
            this.setState({ _a: this.state._a++ });
        }, 50)
    }

    render() {
        const {animator}=this.state;
        const _a = animator.__getValue();
        const _d = 'M'+_a+' 5 Q '+(20+_a)+' -5, '+(40+_a)+' 5 T '+(80+_a)+' 5 Q '+(100+_a)+' -5, '+(120+_a)+' 5 T '+(160+_a)+' 5 V60 H'+_a+' V5 Z'

        return (
            <View style={this.props.style}>
                <Surface width={160} height={60}>
                    <ClippingRectangle id="path" x="0" y="0" width="50" height="50" opacity="1">
                        <Shape d={_d} fill="rgba(255, 120, 150, .8)"/>
                    </ClippingRectangle>
                </Surface>
            </View>
        );
    }

    _loop=()=>{
        this.state.animator.setValue(0);

        Animated.timing(this.state.animator, {
            duration: 2000,
            toValue: -80,
            easing: Easing.linear
        }).start(this._loop);

    }
}