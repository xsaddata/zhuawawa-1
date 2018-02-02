<template>
  <div class="gold_notes page">
    <vNav></vNav>
    <ul class="list" v-if="list !== null">
      <li class="item" v-for="(item,index) in list" :key="index">
        <p class="memo">{{item.memo}}</p>
        <p class="log_time">{{item.log_time}}</p>
        <span class="money">{{item.money}}</span>
      </li>
    </ul>
    <noData v-else></noData>
  </div>
</template>

<script>
  import {vNav, noData} from "../../../components";
  export default {
    name: 'gold_notes',
    components: {vNav, noData},
    data () {
      return {
        list: null
      }
    },
    created(){
      this.loading.show();
      console.log(this.cookie.get('token'))
      this.ajax("gold_notes", `token=${this.cookie.get('token')}`, this.get_notes);
    },
    methods: {

      get_notes(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.length > 0) {
          this.list = d.info;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
@import "./index.less";
</style>
