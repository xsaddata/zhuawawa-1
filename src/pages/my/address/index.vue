<template>
  <div class="address page">
    <vNav></vNav>
    <span class="add" @click="add"></span>


    <swipeout class="list" v-if="list !== null">
      <swipeout-item
        ref="swipeoutItem"
        :right-menu-width="70"
        :sensitivity="15"
        v-for="(item,index) in list" :key="item.id">
        <div slot="right-menu">
          <swipeout-button @click.native="del(index)" type="warn" :width="70">删除</swipeout-button>
        </div>
        <div slot="content" class="item" @click="_default(index)" :class="item.status === '1' && 'gray'">
          <div class="state ">
            <div class="option">
              <div :class="item.status === '1' ? 'select':'no_select'"></div>
            </div>
          </div>
          <div class="content">
            <p class="address">{{item.address + item.city}}</p>
            <p class="name">{{item.name + " " + item.mobile}}</p>
            <span class="revise" @click.stop="revise(index)"></span>
          </div>
        </div>
      </swipeout-item>
    </swipeout>

  </div>
</template>

<script>
  import {Swipeout, SwipeoutItem, SwipeoutButton} from 'vux'
  import {vNav} from "@/components";
  export default {
    name: 'addressPage',
    components: {vNav, Swipeout, SwipeoutItem, SwipeoutButton},
    data () {
      return {
        list: null,
        disabled: false,
        token: null,
      }
    },
    created(){
      this.token = this.cookie.get('token');
      this.loading.show();
      this.get_address();
    },
    methods: {
      get_address(){
        this.ajax('address', `token=${this.token}`, function (d) {
          this.loading.hide();
          if (d.code !== 200) this.toast(d.descrp);
          else if (d.addr.length > 0) {
            this.list = d.addr;
          }
        }.bind(this));
      },
      add(){
        this.$router.push('add_address')
      },
      del(i){
        this.loading.show();
        this.ajax("del_address", `token=${this.token}&id=${this.list[i].id}`, this.end)
      },
      revise(i){
        let json = JSON.stringify(this.list[i]);
        this.cookie.set("address", json);
        this.add();
      },
      _default(i){
        this.loading.show();
        let d = this.list[i];
        let data = `token=${this.token}&name=${d.name}&mobile=${d.mobile}&address=${d.address}&city=${d.city}&status=1&id=${d.id}`;
        this.ajax("add_address", data, this.end);
      },
      end(d){
        if (d.code !== 200) this.toast(d.descrp);
        else this.get_address();
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
