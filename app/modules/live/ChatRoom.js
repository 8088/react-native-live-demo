/**
 * 直播聊天室
 *
 * @flow
 */
'use strict';
import React, {PureComponent, PropTypes} from 'react';
import {
    View,
    Text,
    ListView,
} from 'react-native';
import Icon from './../../mixins/icons';
import Colors from '../../assets/Colors';
import styles from '../../containers/Live.css';

class Message extends PureComponent {
    static propTypes = {
        notice_type: PropTypes.number,
        author: PropTypes.object,
        reply: PropTypes.object,
        txt:PropTypes.string,

    };
    static defaultProps = {
        notice_type: 3,
        author: {},
        reply: {},
        txt:'',
    };

    constructor(props) {
        super(props);

        this.state = {
            //
        };
    }

    render() {
        var {
            author,
            reply,
            txt,
        } = this.props;
        if (txt.length <1) return null;

        return (
            <Text style={[styles.color_white,{lineHeight:20,textShadowColor:'rgba(0,0,0,.3)',textShadowOffset:{height:1, width:1}}]}>
                {author&&author.nickname?<Text style={styles.color_pink}>{author.nickname}</Text>:null}
                {reply&&reply.nickname?<Text>回复<Text style={styles.color_green}>{reply.nickname}</Text></Text>:null}
                {author&&author.nickname?': ':null}
                {txt}
            </Text>
        );

    }
}

export default class ChatRoom extends PureComponent {

    constructor(props) {
        super(props);

        this.chatHeight =0;
        this.msgs=[];

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    componentDidUpdate() {
        requestAnimationFrame(()=>{
            this._listView&&this._listView.scrollTo({y:8088});
        });
    }

    addMessage=(info)=>{
        if(this.msgs.length>100) this.msgs = this.msgs.slice(50);
        this.msgs.push(info);

        requestAnimationFrame(()=>{
            this.setState({ dataSource: this.state.dataSource.cloneWithRows(this.msgs) });
        });
    }

    render() {
        return (
            <View style={[this.props.style]} onPress={this._onPress}>
                <ListView
                    style={styles.flex_1}
                    ref={component => this._listView = component}
                    dataSource={this.state.dataSource}
                    scrollEventThrottle={200}
                    showsVerticalScrollIndicator={false}
                    renderRow={(rowData) => <Message {...rowData} />}
                />
            </View>
        );
    }

    _onPress=()=>{
        alert(1)
    }

}