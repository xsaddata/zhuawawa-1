<template>
  <div class=" grad page">
    <vNav></vNav>
    <ul class="list" v-if="list !== null">
      <li class="item" v-for="(item,index) in list" :key="index" >
        <img :src="item.img" class="img">
        <p class="name">{{item.name}}</p>
        <p class="play_time theme">{{item.play_time}}</p>
        <span class="play_result theme">{{item.play_result}}</span>
      </li>
    </ul>
    <noData v-else></noData>
  </div>
</template>

<script>
  import {vNav, noData} from "@/components"
  export default {
    name: 'grad',
    components: {vNav, noData},
    data () {
      return {
        list: null,
      }
    },
    created(){
      this.loading.show();
      this.ajax('grad', `token=${this.cookie.get('token')}`, this.getList);
    },
    methods: {
      getList(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.length > 0) this.list = d.info;
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
