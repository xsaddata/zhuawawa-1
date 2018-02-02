<template>

    <nav class="v_header">
      <span class="back" @click="back"></span>
      <!--<slot></slot>-->
      {{$route.meta.title}}
    </nav>

</template>

<script>

  export default {
    name: 'v_nav',
    props: {
      break_fund: {
        type: Function,
      },
    },
    data () {
      return {}
    },
    created(){

    },
    methods: {
      back(){
        if (this.break_fund) this.break_fund();
        else this.$router.go(-1);
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import './index.less';
</style>
