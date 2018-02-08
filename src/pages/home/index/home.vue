<template>
  <div class="home page">
    <!--<ul class="header">-->
    <!--<li class="btn fl my" @click="$router.push('my')"></li>-->
    <!--<li class="appName fl"></li>-->
    <!--<li class="btn fl set" @click="$router.push('set')"></li>-->
    <!--</ul>-->
    <nav class="v_header clearFix">
      快抓娃娃机
      <span class="fl my btn" @click="$router.push('my')"></span>
      <span class="fr set btn" @click="$router.push('set')"></span>
    </nav>

    <!--banner-->
    <div class="banner">
      <swiper :list="banner"
              auto
              height="3.9rem"
              dots-class="custom-bottom"
              :loop="true"
              dots-position="center" :show-desc-mask="false"
              v-if="banner !== null">
      </swiper>
    </div>

    <!--导航-->
    <ul class="btns clearFix">
      <li class="btn1 btn fl">全部</li>
      <li class="btn2 btn fl" @click="invite">邀请</li>
      <li class="btn3 btn fl" @click="_open('mall')">积分商城</li>
      <li class="btn4 btn fl" @click="_open('recharge')">充值</li>
    </ul>

    <!--列表-->
    <ul class="device_lists clearFix" v-if="device !== null">
      <li class="device fl"
          v-for="(item,index) in device"
          :style="`background-image: url(${item.thumb})`"
          :key="item.deviceid"
      @click="$router.push('game?id=' + item.deviceid)">

        {{item.channel_title}}
        <span class="state fr"
              v-if="item.channel_status === '2' || item.channel_status == '3'"
              :class="`state${item.channel_status}`">
          {{{"2": "空闲中", "3": "游戏中"}[item.channel_status]}}
        </span>
        <br>
        <span class="price">{{`${item.price}币/次`}}</span>

      </li>
    </ul>
  </div>
</template>

<script>
  import vNav from "../../../components/nav";
  import {Swiper} from 'vux';
  export default {
    name: 'home',
    components: {
      Swiper,
      vNav
    },
    data () {
      return {
        banner: null,
        device: null,
      }
    },
    created(){
      this.loading.show();
      let token = this.cookie.get('token');
      let code = this.$route.query.code;
      if (token) this.get_banner(token);
      else if (code) {
        this.ajax('login', `code=${code}`, this.login);
      } else this.loading.hide();

    },
    methods: {
      get_banner(token){
        this.ajax('get_banner', `token=${token}&limit_begin=0&limit_num=20`, this.init_banner);
      },
      init_banner(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {
          let banner = [];
          banner = d.banner.pic.map((item) => {
            return {
              url: "javascript;",
              img: item.img,
              id: item.id,
              fallbackImg: "./static/img/banner.png"
            }
          });
          this.banner = banner;
          this.device = d.info.device;
        }
        this.loading.hide()
      },
      login(d){
        this.loading.hide();
        if (d.code !== 200) {
          this.toast(d.descrp);
          this.$router.push('login')
        }
        else {
          let token = d.data.api_token;
          this.cookie.set("token", token);
          this.cookie.set("id", d.data.id);
          this.cookie.set("balance", d.data.balance);
          this.get_banner(token)
        }
      },
      invite(){
//        window.location.href = this.url.host + this.url.api.invite + this.cookie.get('token');
        this.$wechat.onMenuShareAppMessage({
          title: '邀请标题', // 分享标题
          desc: '描述', // 分享描述
          link: window.location.origin, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: '', // 分享图标
          success: function () {

          },

        });
      },
      _open(page){
        this.$router.push(page);
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './home.less';
</style>
