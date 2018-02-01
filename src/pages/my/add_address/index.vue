<template>
  <div class="add_address page">
    <vNav></vNav>
    <div class="from">
      <label class="label">
        <span class="k">收货人</span>
        <input type="text" class="v" placeholder="请输入收货人姓名">
      </label>
      <label class="label">
        <span class="k">联系方式</span>
        <input type="text" class="v" placeholder="请输入联系方式">
      </label>
      <div class="label">
        <span class="k">省/市/区/县</span>
        <input type="text" class="v" placeholder="">
      </div>
      <label class="label">
        <span class="k">收货地址</span>
        <input type="text" class="v" placeholder="请输入收货人详细地址">
      </label>
      <div class="label">
        <span class="k">设置为默认</span>
        <span class="switch fr"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {vNav} from "@/components";
  export default {
    name: 'add_address',
    components: {vNav},
    data () {
      return {}
    },
    created(){

    },
    methods: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
