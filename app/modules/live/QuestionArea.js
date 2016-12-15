/**
 * 直播提问区
 *
 * @flow
 */
'use strict';
import React, {PureComponent, PropTypes} from 'react';
import {
    View,
    Text,
    Easing,
    Animated,
    LayoutAnimation,
} from 'react-native';
import Icon from './../../mixins/icons';
import Colors from '../../assets/Colors';
import styles from '../../containers/Live.css';
import Avator from '../../modules/live/Avator';
import Button from '../../components/Button';

class Question extends PureComponent {
    static propTypes = {
        author: PropTypes.object,
        txt: PropTypes.string,
    };
    static defaultProps = {
        author: null,
        txt: '',
    };

    constructor(props) {
        super(props);

        this.state = {
            disabled: false,
        };
    }

    render() {
        var { author, txt } = this.props;
        var { disabled } = this.state;
        return (
            <View style={[styles.question_info, disabled?{backgroundColor:'rgba(255, 165, 170, .7)',}:null]}>
                <View style={[styles.flex_row, styles.align_center]}>
                    <Avator {...author}/>
                    <View style={styles.question_info_text}>
                        <View style={[styles.flex_row, styles.align_center]}>
                            <Text style={styles.color_purple}>{author.nickname}</Text>
                            {author.verify&&author.verify.is_verify?<View style={[styles.bg_radius7, styles.margin_left_5, {backgroundColor: Colors.c10}]}>
                                <Text style={[styles.font_size_10, styles.color_white,]}>{author.verify.verify_type}</Text>
                            </View>:null}
                        </View>
                        <Text numberOfLines={1} style={[styles.color_white,{maxWidth:200}]}>{txt}</Text>
                    </View>
                </View>
                <Button
                    style={[styles.question_btn, disabled?{ backgroundColor: 'rgba(255, 120, 150, .9)',}:null]}
                    disabled={disabled}
                    onPress={this._onPress}>
                    <Icon name={'wenhao'} size={24} color={disabled?Colors.white:Colors.pink}/>
                </Button>
            </View>
        );
    }

    _onPress=(evt)=>{
        this.setState({disabled:true});

        this.props.callback();
    }
}

class AnimatedQuestion extends PureComponent
{
    static propTypes = {
        onComplete:PropTypes.func,
    };

    static defaultProps = {
        onComplete: ()=> {},
    };

    constructor(props) {
        super(props);
        this.state = {
            position: new Animated.Value(-300),
            scale: new Animated.Value(0),
        };
    }

    componentWillMount() {
        //
    }

    componentDidMount() {
        Animated.spring(this.state.position, {
            duration: 600,
            toValue: 0,
        }).start();

        this.timer = setTimeout(()=>{
            this._clear();
        }, 5000);
    }

    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }

    render() {
        return (
            <Animated.View style={{flexDirection: 'row', height:45, overflow:'hidden', transform:[{translateX: this.state.position},]}}>
                <Question {...this.props.data} callback={this._addAsk}/>
                <Animated.View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom:3,
                    transform: [
                        {scale: this.state.scale},
                    ],
                    opacity:this.state.scale,
                }}>
                    <Icon name={'zhuiwen'} size={56} color={Colors.pink}/>
                    <Text style={{fontSize:24, paddingBottom:3, color:Colors.pink}}>+1</Text>
                </Animated.View>
            </Animated.View>
        )
    }

    _clear=()=>{
        this.clearing = true;
        Animated.timing(this.state.position, {
            duration: 300,
            toValue: -300,
            ease: Easing.in
        }).start(this.props.onComplete);
        this.timer&&clearTimeout(this.timer);
    }

    _retime=()=>{
        this.timer&&clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this._clear();
        }, 5000);
    }

    _addAsk=()=>{
        if(this.clearing) return;
        this._retime();

        Animated.sequence([
            Animated.delay(220),
            Animated.spring(this.state.scale, {
                toValue: 1,
                friction: 5,
                tension: 80,
            }),
            Animated.timing(this.state.scale,{
                toValue: 0,
                duration: 200,
                ease: Easing.inOut
            })
        ]).start();
    }

}

export default class QuestionArea extends PureComponent {

    constructor(props) {
        super(props);
        this.questions = [];
        this.state = {
            redraw: 0,
        };
    }

    addQuestion=(quest)=>{
        if(quest&&(!quest.id||quest.id==='')) quest.id = (new Date())*1;
        this.questions.push(quest);

        requestAnimationFrame(()=>{
            this.setState({redraw: quest.id});
        });

        /*
        LayoutAnimation.configureNext({
            duration: 200,
            create: {
                type: LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.scaleXY,
            },
            update: {
                type: LayoutAnimation.Types.easeOut,
            },
        });
        this.setState({count:this.count});
        */

    }

    removeQuestion=(id)=>
    {
        let index = this.questions.findIndex((question)=> question&&question.id === id);
        this.questions[index] = null;

        requestAnimationFrame(()=>{
            this.setState({redraw: (new Date())*1});
        });
    }

    componentDidUpdate(){
        this._clearNull();
    }

    render() {

        return (
            <View style={this.props.style}>
                {
                    this.questions.map((info, index)=>{
                        return (
                            info?<AnimatedQuestion data={info} key={index} onComplete={()=>this.removeQuestion(info.id)}/>:null
                        );
                    })
                }
            </View>
        );
    }

    _clearNull=()=>{
        var ln=this.questions.length;
        var temp = [];
        for(var i=0;i!==ln;i++){
            if(this.questions[i]) temp.push(this.questions[i]);
        }
        this.questions = temp;
    }

}