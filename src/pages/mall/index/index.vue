<template>
  <div class="mall page">
    <vNav></vNav>
    <!--标签-->
    <div class="tab" v-if="conver !== null">
      <ul class="tab_list clearFix">
        <li class="fl tab_itme" @click="onItemClick(0)" :class="selected === 0 && 'selected'">积分：{{conver}}</li>
        <li class="fl tab_itme" @click="onItemClick(1)" :class="selected === 1 && 'selected'">兑换记录</li>
      </ul>
      <div class="tab_bar" :class="selected === 1 && 'bar_transition'">
        <span class="tab_bar_inner"></span>
      </div>
    </div>
    <div class="left" v-show="selected === 0">
      <!--banner-->
      <ul class="banner" v-if="banner !== null">
        <li class="banner_img fl" :style="'background-image:url('+ banner[0].img+')'"></li>
        <li class="banner_img fl" :style="'background-image:url('+ banner[1].img+')'"></li>
      </ul>
      <!--兑换列表-->
      <ul class="list clearFix">
        <li class="item fl"
            v-for="(item,index) in list"
            :key="item.id"
            :style="'background-image:url('+item.list_img+')'"
        >
          <p class="text">
            <span class="fr" @click="exchange(item.id)">兑换</span>
            <span class="name">{{item.name}}</span>
            <br>
            <span class="conver">{{item.integration}}积分</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="right" v-show="selected === 1">
      <!--兑换记录-->
      <ul class=" record" v-if="ex_record_list !== null">
        <li class="item" v-for="(item,index) in ex_record_list"
            :style="'background-image:url('+item.list_img+')'"
            :key="index">
          <span class="fr">{{item.status}}</span>
          <span class="name">{{item.name}}</span>
          <br>
          <span class="time">{{item.create_time}}</span>
        </li>
      </ul>
      <!--无数据-->
      <noData v-else class="noData"></noData>
    </div>

  </div>
</template>

<script>
  import {vNav, noData} from "@/components"
  export default {
    name: 'mall',
    components: {vNav, noData},
    data () {
      return {
        selected: 0,
        banner: null,
        list: null,
        conver: null,
        ex_record_list: null,
      }
    },
    created(){
      this.ajax("convertList", `token=${this.cookie.get('token')}`, this.convertList);
      this.ajax("ex_record", `token=${this.cookie.get('token')}`, this.ex_record);
    },
    methods: {
      onItemClick(selected){    //  切换 信用卡/储蓄卡 列表
        if (selected !== this.selected) this.selected = selected;
      },
      convertList(d){
        if (d.code !== 200) this.toast(d.info.descrp);
        else {
          if (d.banner.pic.length > 0) this.banner = d.banner.pic;
          if (d.info.gift.length > 0) this.list = d.info.gift;
          if (d.integrations) this.conver = d.integrations.user_integration || 0;
        }
      },
      ex_record(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {
          if (d.info.length > 0) this.ex_record_list = d.info;
        }
      },
      exchange(id){
        this.loading.show();
        this.ajax('exchange', `token=${this.cookie.get('token')}&id=${id}`, this.end)
      },
      end(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.toast('兑换成功');
          this.conver = d.integration.user_integration;
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
