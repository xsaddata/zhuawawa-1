<template>
  <div class="my page">
    <header class="header">
      <vNav class="nav">我的</vNav>
      <div class="info">
        <img :src="info.avatar" class="avatar">
        <ul class="info_list clearFix">
          <li class="li fl" @click="go('exchange')">
            <span class="line fr"></span>
            <p class="c3">{{info.not_token_num}}</p>
            <p class="text">未取娃娃</p>
          </li>
          <li class="li fl">
            <span class="line fr"></span>
            <p class="c3 user_name">{{info.user_nicename}}</p>
            <p class="text">{{'ID:' + info.id}}</p>

          </li>
          <li class="li fl">
            <p class="c3">{{info.jifen || '无'}}</p>
            <p class="text">积分</p>
          </li>
        </ul>
      </div>
    </header>

    <ul class="list">
      <li class="item" @click="go('service')">
        <img src="./img/kefu.png" alt="" class="icon">
        客服小抓来帮您
      </li>
      <li class="item" @click="go('news')">
        <img src="./img/news.png" alt="" class="icon">
        消息通知
      </li>
      <li class="item" @click="go('')">
        <img src="./img/address.png" alt="" class="icon">
        收货地址
      </li>
      <li class="item" @click="go('')">
        <img src="./img/gold.png" alt="" class="icon">
        金币记录
      </li>
      <li class="item" @click="go('')">
        <img src="./img/grab.png" alt="" class="icon">
        抓取记录
      </li>
    </ul>
  </div>
</template>

<script>
  import {vNav} from "../../../components";
  export default {
    name: '',
    components: {vNav},
    data () {
      return {
        info: {
          avatar: '',
          not_token_num: '0',
          jifen: "0",   //  等接口 改
          id: "888888",
          user_nicename: 'user_name'
        },
        token: null,
      }
    },
    created(){
      let [token, id] = [this.cookie.get("token"), this.cookie.get('id')];
      if (token && id) {
        this.loading.show();
        this.token = token;
        this.ajax('get_info', `id=${id}&token=${token}`, this.init_info);
      }
    },
    methods: {
      init_info(d){
        this.loading.hide();
        if (d.code === 200) {
          this.info = d.data;
        } else this.toast(d.descrp || "链接服务器失败");
      },
      go(page){
        let p = '';
        if (this.token) p = page;
        else p = "login";
        this.$router.push(p);
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './my.less';
</style>
