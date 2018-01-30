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
      <li class="btn2 btn fl">邀请</li>
      <li class="btn3 btn fl">积分商城</li>
      <li class="btn4 btn fl">充值</li>
    </ul>

    <!--列表-->
    <ul class="device_lists clearFix" v-if="device !== null">
      <li class="device fl"
          v-for="(item,index) in device"
          :style="`background-image: url(${item.thumb})`"
          :key="item.deviceid">
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
  import vNav from "../../components/nav";
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
      this.ajax('get_banner', {}, this.init_banner);
    },
    methods: {
      init_banner(d){
        if (d.code === 200) {
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

    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './home.less';
</style>
