<template>
  <div class="exchange page">
    <vNav class="vNav">奖品兑换</vNav>
    <div class="data" v-if="list.length !== 0">
      <ul class="list">
        <li class="item"
            v-for="(item,index) in list"
            :class="item.change === 0 ? 'zhua': 'dui'"
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
        <span @click="submit(0)" class="btn dui" :class="dui_btn? 'theme':'gray'">兑换</span>
        <span @click="submit(1)" class="btn ti" :class="ti_btn? 'theme':'gray'">提取</span>
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
        token: '',
        checked: {},
        dui_btn: false,
        ti_btn: false,
      }
    },
    created(){
      this.token = this.cookie.get('token');
      this.load_more();
    },
    methods: {
      load_more(){
        this.loading.show();
        this.ajax('wait_baby', `token=${this.token}&limit_begin=${this.limit_begin}&limit_num=${this.limit_num}`, this.add_record);
      },
      add_record(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.length > 0) {
          this.list = this.list.concat(d.info);
        }
      },
      tab_checked(i){
        let val = true;
        let dui_btn_state = true;
        let ti_btn_state = false;
        this.checked[i] && (val = false);
        this.$set(this.checked, i, val);
        !val && (delete this.checked[i]);
        for (let k in this.checked) {
          ti_btn_state = true;
          if (this.list[k].change === 0) {
            dui_btn_state = false;
            break;
          }
        }
        this.ti_btn !== ti_btn_state && (this.ti_btn = ti_btn_state)
        this.dui_btn !== dui_btn_state && (this.dui_btn = dui_btn_state);
      },
      submit(type){
        if ((type === 0 && this.dui_btn) || (type === 1 && this.ti_btn)) {
          let info = [];
          for (let k in this.checked) {
            info.push(this.list[k])
          }
          this.loading.show('提交中');
          this.ajax('applyPostWawa', `token=${this.token}&info=${info}&type=${type}`, this.end);
        }
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
