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
            <Text style={[styles.color_white, styles.background_transparent, {lineHeight:20,textShadowColor:'rgba(0,0,0,.3)',textShadowOffset:{height:1, width:1}}]}>
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

        this.last_y =0;
        this.activiting=false;
        this.msgs=[];

        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
    }

    addMessage=(info)=>{
        if(!this.activiting&&this.msgs.length>100) this.msgs = this.msgs.slice(50);
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
                    scrollEventThrottle={500}
                    showsVerticalScrollIndicator={false}
                    onScroll={this._onScroll}
                    renderRow={(rowData) => <Message {...rowData} style={styles.background_transparent} />}
                    onLayout={(evt)=>this._listViewHeight = evt.nativeEvent.layout.height}
                    onContentSizeChange = {(width, height)=>{
                        this._contentHeight = height;
                        this._scrollToBottom();
                    }}
                />
            </View>
        );
    }

    _onScroll=(evt)=>{
        let _scroll_y = evt.nativeEvent.contentOffset.y-this.last_y;
        if(_scroll_y<0&&_scroll_y>-100)
        {
            this.activiting = true;

            this.timer&&clearTimeout(this.timer);
            this.timer = setTimeout(()=>{
                this.activiting = false;
            }, 3600);
        }
        this.last_y = evt.nativeEvent.contentOffset.y;
    }

    _scrollToBottom() {
        const _offset = this._contentHeight - this._listViewHeight;
        if (!this.activiting&&_offset > 0) this._listView.scrollTo({x:0, y:_offset, true});
    }
}