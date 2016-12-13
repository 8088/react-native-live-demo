/**
 * 个人用户卡片模块
 *
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
} from 'react-native';
import Icon from './../../mixins/icons';
import Button from '../../components/Button';
import ToggleButton from '../../components/ToggleButton';
import Colors from '../../assets/Colors';
import styles from '../../containers/Live.css';

var COLOR = ['#88D1C6', '#73C4F7', '#90D796', '#f7d673', '#f77373'];

export default class Avator extends Component {
    static propTypes = {
        type_id: PropTypes.number,
        uid: PropTypes.string,
        nickname: PropTypes.string,
        avator: PropTypes.string,
        level: PropTypes.number,
    };
    static defaultProps = {
        type_id: 99,
        uid: null,
        nickname: null,
        avator: null,
        level: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            //
        };
    }

    render() {
        var {
            type_id,
            uid,
            avator,
            nickname,
            level,
        } = this.props;
        return (
            <Button
                onPress={()=>this._gotoPage('PERSON_HOME', nickname, {type_id:type_id, dataId:uid})}
                style={[styles.margin_right_5, {width: 45}]}>
                <Image style={styles.avator_40} source={{uri:avator}} />
                <View style={[styles.level, {backgroundColor: global.LEVEL_COLOR[level]}]}>
                    <Icon name={'vip-v'+level} size={9} color={'#fff'}/>
                </View>
            </Button>
        );
    }


    _gotoPage = (pageId, pageTitle, pageData,)=> {
        //..
        // requestAnimationFrame(()=>{
        //     this.props.navigator.push({id: pageId, title: pageTitle, data:pageData});
        // });
    }

}
