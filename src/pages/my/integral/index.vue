<template>
  <div class="integral page">
    <vNav>金币记录</vNav>
    <div class="list" v-if="integral !== null"></div>
    <noData v-else></noData>
  </div>
</template>

<script>
  import {vNav, noData} from "../../../components";
  export default {
    name: 'integral',
    components: {vNav, noData},
    data () {
      return {
        integral: null,
      }
    },
    created(){
      let token = this.cookie.get("token");
      if (token) this.ajax('integral', `token=${token}`, this.get_integral)
    },
    methods: {
      get_integral(d){
        if (d.code !== "200") this.toast(d.descrp);
        else if (d.info.length > 0) {
          this.integral = d.info;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">

</style>
