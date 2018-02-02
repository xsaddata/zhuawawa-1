<template>
  <div class="integral page">
    <vNav></vNav>
    <div class="list" v-if="integral !== null">
      <div class="item" v-for="(item,index) in integral" :key="index">
        <p class="mem">{{item.mem}}</p>
        <p class="create_time">{{item.create_time}}</p>
        <span class="update_integration">{{item.update_integration}}</span>
      </div>
    </div>
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
      if (token) {
        this.loading.show();
        this.ajax('integral', `token=${token}`, this.get_integral)
      }
    },
    methods: {
      get_integral(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.length > 0) {
          this.integral = d.info;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
