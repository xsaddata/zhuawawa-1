<template>
  <div class="gold_notes page">
    <vNav></vNav>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">


      <ul class="list" v-if="list.length > 0">
        <li class="item" v-for="(item,index) in list" :key="index">
          <p class="memo">{{item.memo}}</p>
          <p class="log_time">{{item.log_time}}</p>
          <span class="money">{{item.money}}</span>
        </li>
      </ul>
      <noData v-else></noData>
    </div>
  </div>
</template>

<script>
  import {vNav, noData} from "../../../components";

  //  import infiniteScroll from 'vue-infinite-scroll'
  export default {
    name: 'gold_notes',
    components: {vNav, noData},
    data () {
      return {
        list: [],
        busy: true,
        limit_begin: 0,
      }
    },
    created(){

      this.getData();
    },
    methods: {
      loadMore: function () {
          debugger;
          if(this.busy === false){
            this.busy = true;

            this.getData();
          }

      },
      getData(){
        this.loading.show();
        this.ajax("gold_notes", `token=${this.cookie.get('token')}&limit_begin=${this.limit_begin}&limit_num=20`, this.get_notes);
      },
      get_notes(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.length > 0) {
          this.limit_begin += 20;
          this.busy = false;
          this.list.push(...d.info);
        }
      }
    },
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
