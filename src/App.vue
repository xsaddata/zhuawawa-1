<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  @import "./assets/css/reset.less";
  @import "./assets/css/theme.less";

  #app {
    background: @page_bg;
  }

</style>
