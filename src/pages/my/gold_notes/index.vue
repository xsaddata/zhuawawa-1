<template>
  <div class="gold_notes page">
    <vNav></vNav>
    <ul class="list" v-if="list !== null">
      <li class="item" v-for="(item,index) in list">

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
      this.ajax("gold_notes", `token: ${this.cookie.get('token')}`, this.get_notes);
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

</style>
