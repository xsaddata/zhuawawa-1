const QUDAO = 'kuailai-one';
const url = {
  host: "http://doll.anwenqianbao.com/",
  api: {
// 登录
    protocol: "portal/page/index/id/2?qudao=" + QUDAO + "&token=",    //  协议
    getCode: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92a8cf90e10ebc4e&redirect_uri=http://test.m.doll.anwenqianbao.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',
// 首页
    login: "Api/SiSi/wxlogin",    //  微信登录
    get_banner: "Api/SiSi/getLiveBanner",   //  轮播
// 房间
    enterDeviceRoom: "Api/SiSi/enterDeviceRoom",    //  进入房间
    connect: "Api/SiSi/connDeviceControl",    //  申请连接设备
    history: "Api/SiSi/getWinLogByDeviceid",   //  最近抓中记录
// 设置
    help: "portal/appweb/help?qudao=" + QUDAO + "&token=",       //  帮助
    invite: "portal/appweb/my_code?qudao=" + QUDAO + "&token=",  //  邀请
    invite_code: "portal/appweb/input_code?qudao=" + QUDAO + "&token=",    //  邀请码
    feedback: "portal/appweb/feedback?qudao=" + QUDAO + "&token=",   //  问题反馈
    about: "portal/appweb/about_us?qudao=" + QUDAO + "&token=",    //  关于
// 我的
    get_info: "Api/SiSi/getUserInfo",                 // 个人信息
    recharge: 'Api/SiSi/get_recharge',                // 充值列表 [recharge]
    wait_baby: 'Api/SiSi/getNotTakenWawaByToken',     // 奖品兑换列表 [exchange]
    applyPostWawa: 'Api/SiSi/getPostConvert',         // 兑换&提取  [exchange]
    get_note: 'Api/SiSi/pushNotice',                  // 消息通知  [news]
    integral: "Api/SiSi/intergationLog",              // 积分记录
    gold_notes: "Api/SiSi/getMoneylog",               // 金币记录
    grad: "Api/SiSi/getPlayLogByUid",                 // 抓取记录
    add_address: "Api/SiSi/addAddress",               // 添加或修改地址 []
    address: "Api/SiSi/getAddress",                   // 获取地址
    del_address: "Api/SiSi/delAddress",               // 获取地址
// 积分商城
    convertList: "Api/SiSi/convertList",              //  积分商城 列表
    exchange: "Api/SiSi/convertApply",                //  积分兑换商品
    ex_record: 'Api/SiSi/convertLog',                 //  兑换记录
// 微信
    wxJSSDK: "Api/SiSi/wxJSSDK",
    pay: "Api/Wxpay/QrcodePay",
// 活动
    getPrize: 'Api/SiSi/getPrize',                    //  获取抽奖信息
    startPrize: "Api/SiSi/startPrize",                //  抽奖结果
    share: 'Portal/appweb/my_code_share',             //  分享
    myPrize: "Api/SiSi/winnerLog",                    //  中奖记录
  },
};

export default url;
