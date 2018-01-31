<template>
  <div class="exchange page">
    <vNav class="vNav">奖品兑换</vNav>
    <div class="data" v-if="list.length !== 0">
      <ul class="list">
        <li class="item"
            v-for="(item,index) in list"
            :class="item.change && item.change === 0? 'zhua': 'dui'"
            @click="tab_checked(index)"
            :key="item.doll_id">
          <p class="fl btn_box">
            <span class="btn">
              <i :class="checked[index]? 'btn_c':'hide'"></i>
            </span>
          </p>
          <p class="fl content_box">
            <img :src="item.img" class="img fl">
            <span class="content fl">
            <i class="c_name">{{item.name}}</i>
            <br>
            <i class="theme">{{item.play_time}}</i>
          </span>
          </p>
        </li>
      </ul>

      <div class="btns">
        <span @click="submit(0)" class="btn dui" :class="dui_btn.length > 0? 'theme':'gray'">兑换</span>
        <span @click="submit(1)" class="btn ti" :class="ti_btn.length > 0 ? 'theme':'gray'">提取</span>
      </div>
    </div>
    <noData v-else></noData>
  </div>
</template>

<script>
  import {vNav, noData} from "../../../components";
  export default {
    name: 'exchange',
    components: {vNav, noData},
    data () {
      return {
        limit_begin: 0,
        limit_num: 20,
        list: [],
        checked: [],
        ti_btn: [],    //  按钮是否能点
        dui_btn: [],   //  按钮是否能点
        token: '',
        del: [],     //  提取&兑换 成功后删除
      }
    },
    created(){
      let token = this.cookie.get('token');
      if (token) {
        this.token = token;
        this.load_more();
      }
    },
    methods: {
      load_more(){
        this.loading.show();
        this.ajax('wait_baby', `token=${this.token}&limit_begin=${this.limit_begin}&limit_num=${this.limit_num}`, this.add_record);
      },
      add_record(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp || '链接服务器失败！');
        else if (d.info.length > 0) {
          this.list = this.list.concat(d.info);
          this.checked = this.list.map(() => {
            return false;
          });
        }
      },
      tab_checked(i){
        this.$set(this.checked, i, !this.checked[i]);
        let ti_btn = [];
        let dui_btn = [];
        let del = [];
        for (let index = 0; index < this.checked.length; index++) {
          if (this.checked[index]) {
            ti_btn.push(this.checked[index].id);
            del.push(index);
            if (this.checked[index].change === 0) dui_btn.push(this.checked[index].id);
          }
        }
        this.del = del;
        this.ti_btn = ti_btn;
        this.dui_btn = dui_btn;
      },
      submit(type){
        let doll_id = [];
        if (type === 0) {
          if (this.dui_btn.length === 0)return false;
          else doll_id = this.dui_btn;
        } else {
          if (this.ti_btn.length === 0)return false
          else doll_id = this.ti_btn;
        }

        this.loading.show('提交中');
        this.ajax('applyPostWawa', `token=${this.toekn}&doll_id=${doll_id.join(',')}&type=${type}`, this.end);

      },
      end(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.alert('操作成功');
          let list = this.list.slice(0);
          for (let i = 0; i < this.del.length; i++) {
            list.splice(this.del[i] - i, 1);
          }
          this.list = list;
          this.checked = [];
          this.del = [];
          this.ti_btn = [];
          this.dui_btn = [];
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
