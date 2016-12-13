/**
 * 模拟直播实时发来的一条条消息数据
 *
 * @flow
 */
var CARD_USER={ //用户卡片
    type_id: 99,
    uid: '40817', //必须
    username: '',
    nickname: '美美mei', //必须
    avator: 'http://img.jinsque.com/avator/uid_1715821.jpg@!y8',
    level: 5,
    verify: {
        is_verify: true,
        verify_type: "达人",
        verify_id: null
    },
    sex: '女',
    age: '23~26',
    location: '北京',
    is_follow: false,
    follower: '9.3W',
    sign: '美丽是一种人生态度',
};

//某某用户状态改变消息(进入/退出直播、关注主播、抢到红包、...)
var USER_STATE={
    notice_type:0,
    author:CARD_USER,//可以只填必须字段
    txt: '进入了房间/退出了房间/关注了主播/抢到了100块大红包/'
}
//公告提醒消息
var NOTICE={
    notice_type:1,
    txt:'温馨提示：距离发送红包还有5分钟，红包雨就要下来了。。。。。',
    times:3, // 提醒3遍
}
//提问消息
var QUESTION={
    notice_type:2,
    txt:'医院地址在哪?',
    author:CARD_USER,
}
//聊天消息0
var MESSAGE0={
    notice_type:3,
    author:{},
    reply:{},
    txt:'直播介绍直播介绍直播介绍直播介绍直播介绍',
}
//聊天消息1
var MESSAGE1={
    notice_type:3,
    author:CARD_USER, //可以只填必须字段
    reply:{},//可以只填必须字段
    txt:'丽都整形医院地址在哪?',
}
//聊天消息2
var MESSAGE2={
    notice_type:3,
    author:CARD_USER, //可以只填必须字段
    reply:CARD_USER,//可以只填必须字段
    txt:'丽都整形医院  地址：北京朝阳区慧忠里103楼D座',
}

//后台系统/命令消息
var SYSTEM={
    notice_type:4,
    system:{
        type:0, //0:红包雨倒计时开始
        countdown: 300000, //倒计时5分钟
    },

}

export default {
    author: CARD_USER,
    user: USER_STATE,
    notice: NOTICE,
    question: QUESTION,
    messages: [USER_STATE,MESSAGE0,MESSAGE1,MESSAGE2,],
    system: SYSTEM,
}