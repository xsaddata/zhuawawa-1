<template>
  <div class="news page">
    <vNav class="nav">消息通知</vNav>
    <div class="list" v-if="list !== null">
      <div class="item" v-for="(item,index) in list" :key="index">
        <div class="tiem">{{item.update_time}}</div>
        <div class="content">
          <h5 class="title">{{item.title}}</h5>
          <img :src="item.img" class="banner">
          <p class="text">{{item.content}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {vNav} from "../../../components";
  export default {
    name: 'news',
    components: {vNav},
    data () {
      return {
        list: null,
        limit_begin: 0,
        limit_num: 20
      }
    },
    created(){
      let token = this.cookie.get('token');
      token && this.ajax("get_note", `token=${token}&limit_num=${this.limit_num}&limit_begin=${this.limit_begin}`, this.get_note)
    },
    methods: {
      get_note(d){
        if (d.code !== "200") this.toast(d.descrp || "链接服务器失败");
        else {
          this.list = d.info;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
