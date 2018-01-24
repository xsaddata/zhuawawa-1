<template>
  <div class="home page">
    <ul class="header">
      <li class="btn fl my" @click="$router.push('my')"></li>
      <li class="appName fl"></li>
      <li class="btn fl set" @click="$router.push('set')"></li>
    </ul>

    <!--banner-->
    <div class="banner">
      <swiper :list="banner"
              auto
              height="100%"
              dots-class="custom-bottom"
              :loop="true"
              dots-position="center" :show-desc-mask="false">
      </swiper>
    </div>

    <!--公告-->
    <div class="notice">
      <div class="notice_content">
        疯狂输出
      </div>
    </div>

    <!--列表-->
    <ul class="lists clearFix">
      <li class="list fl" v-for="i in live" :key="i.deviceid">
        <div class="list_img">
          <img :src="i.thumb">
          <div class="gold position">{{i.price}}</div>
          <div class="list_start position" :class="'list_start_c'+ i.channel_status">
            {{
            i.channel_status === "3" ? "等待中": i.channel_status === "2" ? "游戏中" : "空闲中"
            }}
          </div>
          <div class="vip position"></div>
        </div>
        <p class="hideText list_name">{{i.channel_title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import {Swiper} from 'vux';
  export default {
    name: 'home',
    components: {
      Swiper
    },
    data () {
      return {
        banner: [],
        live: [],
        loading_state: 2,
      }
    },
    created(){
      this.loading.show();
      this.ajax('get_banner', {qudao: ""}, this.init_banner);
      this.ajax('get_live', {limit_begin: "0", limit_num: "20"}, this.init_live);
    },
    methods: {
      init_banner(d){
        if (d.code === 200) {
          for (let i = 0; i < d.data.length; i++) {
            this.banner.push({
              url: "javascript:",
              img: d.data[i].pic,
              fallbackImg: "http://doll.anwenqianbao.com/data/upload/20171214/5a3240464f1f4.png"
            });
          }
        }
        this.hide_loading();
      },
      init_live(d){
        if (d.code === 200) {
          this.live = d.info;
        }
        this.hide_loading();
      },
      hide_loading(){
        this.loading_state--;
        if (this.loading_state === 0) this.loading.hide();
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './home.less';
</style>
