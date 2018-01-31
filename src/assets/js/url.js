const QUDAO = 'kuailai-one';
const url = {
  host: "http://test.doll.anwenqianbao.com/",
  api: {
    protocol: "portal/page/index/id/2?qudao=" + QUDAO + "&token=",    //  协议 [login]
    getCode: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx92a8cf90e10ebc4e&redirect_uri=http://test.m.doll.anwenqianbao.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',

    get_banner: "Api/SiSi/getLiveBanner",   //  轮播 [home]
    help: "portal/appweb/help?qudao=" + QUDAO + "&token=",       //  帮助 [set]
    invite: "portal/appweb/my_code?qudao=" + QUDAO + "&token=",  //  邀请 [set]
    invite_code: "portal/appweb/input_code?qudao=" + QUDAO + "&token=",    //  邀请码 [set]
    feedback: "portal/appweb/feedback?qudao=" + QUDAO + "&token=",   //  问题反馈 [set]
    about: "portal/appweb/about_us?qudao=" + QUDAO + "&token=",    //  关于 [set]

    get_info: "Api/SiSi/getUserInfo",   //  个人信息 [my]
    recharge: 'Api/SiSi/get_recharge_package',   //  充值列表 [recharge]
    wait_baby: 'Api/SiSi/getNotTakenWawaByUid',    //  奖品兑换列表 [exchange]
    applyPostWawa: 'Api/SiSi/applyPostWawa',    //    兑换&提取  [exchange]
    get_note: 'Api/SiSi/pushNotice',    //    消息通知  [news]
  }
};

export default url;
