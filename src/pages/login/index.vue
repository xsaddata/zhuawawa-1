<template>
  <div class="login page">
    <div class="logo">

    </div>
    <div class="login_box">
      <span class="login_text">微信登录</span>
      <div class="login_btn" @click.stop="login"></div>
      <div class="protocol">
        <span class="agree_btn" @click.stop="agree = !agree" :class="agree ? 'agree':'no_agree'"></span>
        <span @click.stop="go_protocol">用户协议与隐私条款</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        agree: true
      }
    },
    created(){

    },
    methods: {
      go_protocol(){
        window.location.href = this.url.host + this.url.api.protocol + this.cookie.get("token")
      },
      login(){
          debugger
        window.location.href = this.url.api.getCode;
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "/index.less";
</style>
