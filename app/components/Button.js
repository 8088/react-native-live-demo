/**
 * 通用按钮
 * 默认样式当作普通状态,禁用状态通过外部传入
 *
 * @flow
 */
import React, { PureComponent, PropTypes} from 'react';
import {
    View,
    TouchableOpacity,
} from 'react-native';

export default class Button extends PureComponent {
    static propTypes = {
        elementType: PropTypes.string,
        elementId: PropTypes.any,
        activeOpacity: PropTypes.number,
        disabled: PropTypes.bool,
        renderDisabled: PropTypes.func,
        onPress: PropTypes.func,
        style: View.propTypes.style,
    };

    static defaultProps = {
        elementType: 'Button',
        elementId: null,
        activeOpacity: .6,
        disabled: false,
        renderDisabled:null,
        onPress: ()=>{},
        style: null,
    };

    constructor(props){
        super(props);
        this.state = {
            disabled:props.disabled,
        };
    }

    componentWillReceiveProps(props){
        if(props.disabled!=this.state.disabled){
            this.setState({disabled:props.disabled})
        }
    }

    render() {
        var {
            elementId,
            activeOpacity,
            renderDisabled,
            style,
        }= this.props;
        var {disabled}=this.state;

        return (
            <TouchableOpacity
                elementId={elementId}
                activeOpacity={activeOpacity}
                onPress={this._onPress}
                disabled={disabled}>
                {disabled&&renderDisabled?renderDisabled():<View pointerEvents={'box-only'} style={style}>{this.props.children}</View>}
            </TouchableOpacity>
        );
    }

    _onPress=(evt)=>{
        evt.target = this;
        this.props.onPress(evt);
    }
}

