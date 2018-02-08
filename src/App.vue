<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
//  import wx from "./assets/js/wx";
  export default {
    name: 'app',
    created(){
      this.ajax("wxJSSDK", `url=${window.location.href}`, this.init_wxSDK);
    },
    methods: {
      init_wxSDK(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {

          this.$wechat.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: d.data.appid, // 必填，公众号的唯一标识
            timestamp: d.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: d.data.noncestr, // 必填，生成签名的随机串
            signature: d.data.signature,// 必填，签名
            jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
          });
          this.$wechat.ready(() => {

            this.$wechat.onMenuShareAppMessage({
              title: '1234', // 分享标题
              desc: '1234', // 分享描述
              link: window.location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {

              },

            });
          })
        }
      }
    }

  }
</script>

<style lang="less">
  @import "./assets/css/reset.less";
  @import "./assets/css/theme.less";

  #app {
    background: @page_bg;
  }

</style>
