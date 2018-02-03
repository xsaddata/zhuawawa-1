<template>
  <div class="recharge page">
    <Vnav>充值</Vnav>
    <div class="banner">
      <img :src="banner" class="banner_img" v-if="banner">
    </div>

    <ul class="list clearFix" v-if="list !== null">
      <li class="item fl" v-for="(item,index) in list">
        <p class="diamond_num">
          <img class="diamond_img" src="../../../assets/img/diamond.png" alt="">
          {{item.diamond_num + '金币'}}
        </p>
        <p class="money_num">{{"¥ " + item.money_num }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vnav from "@/components/nav";
//  import {Swiper} from '@/components'
  export default {
    name: 'recharge',
    components: {Vnav},
    data () {
      return {
        list: null,
        token: null,
        banner: null,
      }
    },
    created(){
      this.ajax('recharge', '', this.init_list);
      this.token = this.cookie.get("token");

    },
    methods: {
      init_list(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.list = d.prices;
          this.banner = d.banner.pic.img;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
