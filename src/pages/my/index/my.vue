<template>
  <div class="my page">
    <nav class="title">
      <span class="back fl" @click="$router.go(-1)"></span>
    </nav>

    <div class="info">
      <div class="top" :class="info.vip_level > 0 && 'vip'">
        <div class="fl">
          <img class="avatar"
               :src="info.avatar">
        </div>
        <div class="fl data">
          <p class="user_name">{{info.user_nicename}}</p>
          <p class="user_id">{{`ID: ${info.id}`}}</p>
        </div>
      </div>
      <div class="bottom clearFix">
        <div class="money fl" @click="go('recharge')">
          <div class="num fr hideText">{{info.balance}}</div>
        </div>
        <div class="wawa fl">
          <div class="num fr hideText">{{info.not_token_num}}</div>
        </div>
      </div>
    </div>

    <ul class="list">
      <li class="item" @click="go('')">
        <img src="./img/l1.png" alt="" class="icon">
        客服小抓来帮您
      </li>
      <li class="item" @click="go('')">
        <img src="./img/l2.png" alt="" class="icon">
        消息通知
      </li>
      <li class="item" @click="go('')">
        <img src="./img/l3.png" alt="" class="icon">
        收货地址
      </li>
      <li class="item" @click="go('')">
        <img src="./img/l4.png" alt="" class="icon">
        抓取记录
      </li>
      <li class="item" @click="go('')">
        <img src="./img/l5.png" alt="" class="icon">
        金币记录
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: '',
    data () {
      return {
        info: {},
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
        if (this.token) this.$router.push(page)
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './my.less';
</style>
