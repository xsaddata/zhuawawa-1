<template>
  <div class="set page">
    <nav_el>设置</nav_el>
    <div class="set_list">
      <div class="set_box">
        <div class="set_item arrow" @click="open('help')">游戏帮助</div>
      </div>
      <div class="set_box">
        <div class="set_item arrow" @click="open('invite')">邀请奖励</div>
        <div class="set_item arrow" @click="open('invite_code')">输入邀请码</div>
      </div>
      <div class="set_box">
        <div class="set_item music">
          背景音乐
          <span class="switch fr" :class="switch1? 'on':'off'" @click="switch_fund(1)">
            <i class="switch_bar" :class="switch1? 'on':'off'"></i>
          </span>
        </div>
        <div class="set_item music">
          背景音效
          <span class="switch fr" :class="switch2? 'on':'off'" @click="switch_fund(2)">
            <i class="switch_bar" :class="switch2? 'on':'off'"></i>
          </span>
        </div>
      </div>
      <div class="set_box">
        <div class="set_item arrow" @click="open('feedback')">问题反馈</div>
        <!--<div class="set_item">检查更新</div>-->
        <div class="set_item arrow" @click="open('about')">关于我们</div>
      </div>

      <div class="out" @click="out_login">
        退出登录
        <!--<div class="edge"></div>-->
      </div>
    </div>

  </div>
</template>

<script>
  import nav_el from '../../components/nav';

  export default {
    name: 'set',
    components: {
      nav_el
    },
    data () {
      return {
        switch1: true,
        switch2: true,

      }
    },
    created(){
      let switch1 = this.cookie.get('switch1');
      let switch2 = this.cookie.get('switch2');
      switch1 && (this.switch1 = false);
      switch2 && (this.switch2 = false);
    },
    methods: {
      open(k){
        window.location.href = this.url.host + this.url.api[k] + this.cookie.get("token");
      },
      switch_fund(k){
        if (k === 1) {
          this.switch1 = !this.switch1;
          if (this.switch1) this.cookie.remove("switch1");
          else if (!this.cookie.get("switch1")) this.cookie.set("switch1", 1);
        }
        else {
          this.switch2 = !this.switch2;
          if (this.switch1) this.cookie.remove("switch2");
          else if (!this.cookie.get("switch2")) this.cookie.set("switch2", 1);
        }
      },
      out_login(){
        this.out();
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './index.less';
</style>
