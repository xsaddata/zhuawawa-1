<template>
  <div class="add_address page">
    <vNav></vNav>
    <div class="from">
      <label class="label border">
        <span class="k">收货人</span>
        <input type="text" v-model="u_name" class="v" placeholder="请输入收货人姓名">
      </label>
      <label class="label border">
        <span class="k">联系方式</span>
        <input type="text" v-model="tel" class="v" placeholder="请输入联系电话">
      </label>
      <div class="label border">
        <span class="k">省/市/区/县</span>
        <span class="choice fr hideText" @click="show_city = !show_city">{{address||'请选择地址'}}</span>
      </div>
      <label class="label">
        <span class="k">收货地址</span>
        <input type="text" v-model="detailed" class="v" placeholder="请输入收货人详细地址">
      </label>
      <div class="label default">
        <span class="k">设置为默认</span>
        <span class="switch fr"
              :class="agree?'on':'off'"
              @click="agree = !agree">
          <i class="bar" :class="agree?'on':'off'"></i>
        </span>
      </div>
      <div class="submit" @click="submit">保存</div>
    </div>

    <div class="fog"></div>
    <div class="city_list" v-show="show_city">
      <VDistpicker type="mobile" @selected="sele_city"></VDistpicker>
    </div>

  </div>
</template>

<script>
  //  import {PopupPicker, Group} from 'vux';
  import {vNav} from "@/components";
  //  import city from "./city";
  import VDistpicker from 'v-distpicker'

  export default {
    name: 'add_address',
    components: {vNav, VDistpicker},
    data () {
      return {
        agree: true,
        u_name: '',
        tel: "",
        address: "",
        detailed: '',
        id: '',
        show_city: false
      }
    },
    created(){
      let data = this.cookie.get("address");
      data && this.setData(JSON.parse(data));

    },
    methods: {
      setData(data){
        this.u_name = data.name;
        this.tel = data.mobile;
        this.address = data.address;
        this.detailed = data.city;
        this.agree = data.status === '1' ? true : false;
        this.id = data.id;
        console.log(data.status === '1' ? true : false)
      },
      sele_city(obj){
        this.address = `${obj.province.value}-${obj.city.value}-${obj.area.value}`;
        this.show_city = false;
      },
      submit(){
        if (this.u_name === "") this.toast("请填写姓名");
        else if (!/^1[345789]\d{9}$/.test(this.tel)) this.toast("手机号格式不正确");
        else if (this.address === "") this.toast("请选择地址");
        else if (this.detailed === "") this.toast("请输入详细地址");
        else {
          let data = `token=${this.cookie.get("token")}&name=${this.u_name}&mobile=${this.tel}&address=${this.address}&city=${this.detailed}&status=${this.agree ? '1' : '0'}`;
          this.ajax("add_address", data, this.end);
        }
      },
      end(d){
        this.cookie.remove("address");
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.toast("保存成功")
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
