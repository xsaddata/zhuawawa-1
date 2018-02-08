<template>
  <div class="recharge page">
    <Vnav>充值</Vnav>
    <div class="banner">
      <img :src="banner" class="banner_img" v-if="banner">
    </div>

    <ul class="list clearFix" v-if="list !== null">
      <li class="item fl" v-for="(item,index) in list" @click="pay(item.id)" :key="item.id">
        <p class="diamond_num">
          <img class="diamond_img" src="../../../assets/img/diamond.png" alt="">
          {{item.diamond_num + '金币'}}
        </p>
        <p class="money_num">{{"¥ " + item.money_num }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vnav from "@/components/nav";
  //  import {Swiper} from '@/components'
  export default {
    name: 'recharge',
    components: {Vnav},
    data () {
      return {
        list: null,
        token: null,
        banner: null,
        uid: null,
      }
    },
    created(){
      this.ajax('recharge', '', this.init_list);
      this.token = this.cookie.get("token");
      this.uid = this.cookie.get("id");
    },
    methods: {
      init_list(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.list = d.prices;
          this.banner = d.banner.pic.img;
        }
      },
      pay(id){
        const _this = this;
        this.loading.show("请求中");
        this.ajax("pay", `token=${this.token}&bank_id=1&money_id=${id}`, function (d) {
          _this.loading.hide();
          if (d.code !== 200) _this.toast(d.descrp);
          else {
            _this.$wechat.chooseWXPay({
              appId: d.data.appId,
              timestamp: d.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: d.data.nonceStr, // 支付签名随机串，不长于 32 位
              package: d.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: d.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: d.data.paySign, // 支付签名
              success: function (res) {
                _this.ajax('get_info', `id=${_this.uid}&token=${_this.token}`, function (d) {
                  if (d.code === 200) {
                    _this.cookie.set('balance', d.data.balance);
                  }
                });
              }
            });
          }
        })
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
