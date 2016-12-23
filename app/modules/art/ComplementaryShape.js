/**
 * 补间形状
 *
 * @flow
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    ART,
    Platform,
    LayoutAnimation,
} from 'react-native';
import Morph from 'art/morph/path';

const {
    Shape,
} = ART;

export default class ComplementaryShape extends Component {

    static propTypes = {
        ds: PropTypes.array.isRequired,
        loop: PropTypes.bool,
        frameIntervalTime: PropTypes.number,
    };
    static defaultProps = {
        ds: [],
        loop: false,
        frameIntervalTime: 500,
    };

    constructor(props) {
        super(props);
        this._current=0;
        this.state = {
            path: props.ds[0],
        }
    }

    componentDidMount() {
        this._run();
    }

    render() {
        const path = this.state.path;
        return (
            <Shape
                d={path}
                stroke={this.props.stroke}
                fill={this.props.fill}
            />
        );
    }

    _run=()=>{
        const {ds, loop}=this.props;

        this._current++;
        if (this._current >= ds.length){
            if(!loop) return;
            else this._current=1;
        }

        const from = ds[this._current-1];
        const to = ds[this._current];

        cancelAnimationFrame(this.animating);
        this.animating = null;

        this.setState({
            path: Morph.Tween(
                from,
                to,
            ),
        }, () => {
            this._animate(null, this._run);
        });

    }

    _animate=(start, callback)=>{
        this.animating = requestAnimationFrame((timestamp) => {
            if (!start) {
                start = timestamp;
            }

            const delta = (timestamp - start) / this.props.frameIntervalTime;

            if (delta > 1) {
                this.animating = null;
                return callback();
            }

            this.state.path.tween(delta);


            if(Platform.OS==='ios')
            {
                this.setState(this.state, () => {
                    this._animate(start, callback);
                });
            }
            else{
                this.setState(this.state);
                this.timer&&clearTimeout(this.timer);
                this.timer = setTimeout(()=>{
                    this._animate(start, callback);
                }, 50);
            }
        });
    }
}