<template>
  <div class="address page">
    <vNav></vNav>
    <span class="add" @click="$router.push('add_address')"></span>
  </div>
</template>

<script>
  import {vNav} from "@/components";
  export default {
    name: 'address',
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
