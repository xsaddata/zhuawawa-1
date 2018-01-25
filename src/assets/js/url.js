const QUDAO = 'kuailai-one';
const url = {
  host: "http://doll.anwenqianbao.com/",
  api: {
    get_banner: "Api/SiSi/getBanner",   //  轮播 [home]
    get_live: "Api/SiSi/getLive",   //  娃娃机列表 [home]
    help: "portal/appweb/help?qudao=" + QUDAO + "&token=",       //  帮助 [set]
    invite: "portal/appweb/my_code?qudao=" + QUDAO + "&token=",  //  邀请 [set]
    invite_code: "portal/appweb/input_code?qudao=" + QUDAO + "&token=",    //  邀请码 [set]
    feedback: "portal/appweb/feedback?qudao=" + QUDAO + "&token=",   //  问题反馈 [set]
    about: "portal/appweb/about_us?qudao=" + QUDAO + "&token=",    //  关于 [set]
    protocol: "portal/page/index/id/2?qudao=" + QUDAO + "&token=",    //  协议 [set]
    get_info: "Api/SiSi/getUserInfo",   //  个人信息 [my]
    recharge: 'Api/SiSi/get_recharge_package',   //  充值列表 [recharge]
    wait_baby: 'Api/SiSi/getNotTakenWawaByUid',    //  奖品兑换列表 [exchange]
    applyPostWawa: 'Api/SiSi/applyPostWawa',    //    兑换&提取  奖品
  }
};

export default url;
