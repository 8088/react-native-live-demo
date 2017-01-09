/**
 * 直播互动 页面/模块样式
 *
 * @flow
 */
'use strict';

import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';
import Colors from '../assets/Colors'

var window = Dimensions.get('window');

var screen_w = window.width;
var screen_h = window.height;
var msg_w = parseInt((screen_w - 30) * .6);
var _w = parseInt((window.width - 50)/3);
var _h = _w *1.1;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    player: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 0,
    },
    interactive: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
    },
    top_area:{
        flexDirection:'row',
        justifyContent: 'space-between',
        zIndex: 9,
    },
    marquee_area:{
        flexDirection:'row',
        overflow:'hidden',
        width:140,
        height: 26,
        alignItems: 'center',
        position: 'absolute',
        top:20,
        left: 200,
        zIndex:1,
    },
    marquee_text:{
        flexWrap:'nowrap',
        color:'#FFF',
        backgroundColor:'transparent',
    },

    question_area:{
        left: 10,
        bottom: 165,
        position: 'absolute',
        width: 400,
        height: screen_h>330?135:90,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        zIndex:3,
    },
    chat_area:{
        left: 10,
        bottom: Platform.OS==='ios'?50:55,
        position: 'absolute',
        width: 260,
        height: Platform.OS==='ios'?120:110,
        overflow: 'hidden',
        zIndex: 2,
    },
    bubble_area:{
        position: 'absolute',
        // backgroundColor: '#f00',
        right: 0,
        bottom: 0,
        width: 200,
        height: 310,
        zIndex:5,
    },
    bottom_area:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        zIndex: 4,
    },

    author_info:{
        alignSelf: 'flex-start',
        alignItems: 'center',
        flexDirection:'row',
        height:46,
        padding:3,
        backgroundColor:'rgba(0,0,0, .4)',
        borderRadius: 22,
    },
    author_info_text:{
        flexDirection:'column',
        width:90,
        backgroundColor:'transparent',
    },
    followed_effect:{
        position:'absolute',
        width:46,
        height:46,
        right:0,
        top:0,
        zIndex:10,
    },
    author_info_name:{
        color:'#FFF',
        marginTop:3,
    },
    author_info_subscribe:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 120, 150, .9)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop:2,
    },
    question_info:{
        alignSelf: 'flex-start',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        height:40,
        borderRadius: 20,
        backgroundColor:'rgba(255, 120, 150, .4)',
        opacity:0.8,
        marginBottom:5,
    },
    question_info_text:{
        flexDirection:'column',
        backgroundColor:'transparent',
        paddingRight: 10,
    },
    question_btn:{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, .9)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    visitor_list:{
        width:200,
        paddingTop:3,
        overflow:'hidden',
        alignSelf: 'flex-end',
    },





    add_bubble_btn:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    add_bubble_btn_view:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    close_btn:{
        top: 13,
        right: 10,
        position: 'absolute',
        width: 40,
        height: 40,
        backgroundColor:'rgba(0, 0, 0, .4)',
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    doctor_btn:{
        width:40,
        height:40,
        backgroundColor:'rgba(0, 0, 0, .4)',
        borderRadius:20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    input_btn:{
        width:200,
        height:40,
        backgroundColor:'rgba(0, 0, 0, .4)',
        borderRadius:20,
        alignItems: 'center',
        flexDirection:'row',
        paddingLeft: 10,
    },


    avator_40:{
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    avator_50: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    level: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    level_v: {
        color: '#fff',
        fontSize: 9,
        fontStyle: 'italic',
    },
    level_n: {
        fontSize: 6,
    },



    bg_radius7: {
        backgroundColor: '#49B4A3',
        justifyContent: 'center',
        height: 14,
        borderRadius: 7,
        paddingHorizontal: 4,
    },
    flex_1: {
        flex: 1,
    },
    flex_wrap: {
        flexWrap: 'wrap',
    },
    flex_row: {
        flexDirection: 'row',
    },
    flex_start: {
        justifyContent: 'flex-start',
    },
    flex_end: {
        justifyContent: 'flex-end',
    },
    flex_column: {
        flexDirection: 'column',
    },
    flex_between: {
        justifyContent: 'space-between',
    },
    align_start: {
        alignItems: 'flex-start',
    },
    align_end: {
        alignItems: 'flex-end',
    },
    align_center: {
        alignItems: 'center',
    },
    align_v_center: {
        justifyContent: 'center',
    },
    align_v_start: {
        justifyContent: 'flex-start',
    },
    margin_left_10: {
        marginLeft: 10,
    },
    margin_top_10: {
        marginTop: 10,
    },
    margin_right_10: {
        marginRight: 10,
    },
    margin_bottom_10: {
        marginBottom: 10,
    },
    margin_left_5: {
        marginLeft: 5,
    },
    margin_right_5: {
        marginRight: 5,
    },
    margin_top_5: {
        marginTop: 5,
    },
    margin_bottom_5: {
        marginBottom: 5,
    },
    margin_bottom_0: {
        marginBottom: 0,
    },
    padding_30: {
        padding: 30,
    },
    padding_15: {
        padding: 15,
    },
    padding_10: {
        padding: 10,
    },
    padding_right_10: {
        paddingRight: 10,
    },
    padding_bottom_10: {
        paddingBottom: 10,
    },
    padding_top_5: {
        paddingTop: 5,
    },
    padding_bottom_5: {
        paddingBottom: 5,
    },
    font_size_16: {
        fontSize: 16,
    },
    font_size_15: {
        fontSize: 15,
    },
    font_size_14: {
        fontSize: 14,
    },
    font_size_12: {
        fontSize: 12,
    },
    font_size_10: {
        fontSize: 10,
    },
    line_height_20: {
        lineHeight: 20,
    },
    color_black: {
        color: '#000',
    },
    color_white: {
        color: '#fff',
    },
    color_gold: {
        color: '#F5A623',
    },
    color_gray: {
        color: '#ccc',
    },
    color_deep: {
        color: '#999',
    },
    color_pink: {
        color: '#FE7A93',
    },
    color_purple: {
        color: '#fc6fa4',
    },
    color_blue: {
        color: '#3cf',
    },
    color_green: {
        color: '#78ddd9',
    },
    background_transparent:{
        backgroundColor: 'transparent',
    }
});

module.exports = styles;
