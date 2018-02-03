<template>
  <div class="game page">
    <vNav></vNav>
    <span class="diamond" @click="$router.push('recharge')">{{balance}}</span>
    <div class="video position">
      <canvas v-video style="width:100%;height:100%;"></canvas>
    </div>
    <div class="controller position">
      <span class="room fl">{{'4'}}人在房间</span>
      <!--切换按钮-->
      <span class="switch_video fr" @click="sendCaozuo(12)"></span>


      <!--<ul class="ganme_connect">-->
      <!--<li class="li fl w25">-->
      <!--<span class=" btn record"></span>-->
      <!--</li>-->
      <!--<li class="li fl w50" @click="sendCaozuo(13)">-->
      <!--<span class=" btn play">-->
      <!--开始游戏 <br>-->
      <!--<i class="price">x{{price}}</i>-->
      <!--</span>-->
      <!--</li>-->
      <!--<li class="li fl w25">-->
      <!--<span class=" btn chat"></span>-->
      <!--</li>-->
      <!--</ul>-->


      <div class="ingame">
        <span class="top direction btn" @touchstart="sendCaozuo(2)" @touchend="sendCaozuo(16)"></span>
        <span class="bottom direction btn" @touchstart="sendCaozuo(3)" @touchend="sendCaozuo(16)"></span>
        <span class="left direction btn" @touchstart="sendCaozuo(4)" @touchend="sendCaozuo(16)"></span>
        <span class="right direction btn" @touchstart="sendCaozuo(5)" @touchend="sendCaozuo(16)"></span>
        <span class="btn claw" @click="sendCaozuo(11)"></span>
      </div>

    </div>
  </div>
</template>

<!--<script src="./socket.js"></script>-->
<script>

  import{vNav} from "@/components"
  import Kinlink from "./kinlink";
  import send from "./caozuo";

  export default {
    name: 'game',
    components: {vNav},
    data () {
      return {
        balance: null,
        price: 200,

      }
    },
    created(){
      this.userName = this.playerUserName;
      this.uid = this.playerUid;
      this.balance = this.cookie.get('balance') || 0;
//      this.ajax('enterDeviceRoom', `token=${this.cookie.get('token')}&deviceid=${this.$route.query.id}`, this.init)

    },
    methods: {

      init(d){
        if (d.code !== 200) this.toast(d.descrp);
        else {

        }
      },
      sendCaozuo(type){
        send(type)
      }
    },
    directives: {
      video: {
        inserted: function (el) {
          let canvas = el;
          let url = 'ws://pili-live-rtmp.v.anwenqianbao.com:1250/xinhe/001.wsts'; //视频帧数据
          let player = new Kinlink.Player(url, {canvas: canvas});
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";

</style>
