<template>
  <div class="game page">
    <vNav></vNav>
    <span class="diamond" @click="$router.push('recharge')">{{balance}}</span>
    <div class="video position">
      <canvas v-video style="width:100%;height:100%;"></canvas>
    </div>
    <div class="controller position">
      <span class="room fl">{{online_num}}人在房间</span>
      <!--切换按钮-->
      <span class="switch_video fr" @click="sendCaozuo(12)"></span>


      <ul class="ganme_connect" v-show="!in_game">
        <li class="li fl w25">
          <span class=" btn record"></span>
        </li>
        <li class="li fl w50" @click="play">
      <span class=" btn play">
      开始游戏 <br>
      <i class="price">x{{price}}</i>
      </span>
        </li>
        <li class="li fl w25">
          <span class=" btn chat"></span>
        </li>
      </ul>


      <div class="ingame" v-show="in_game">
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
        balance: null,    //  拥有金币数量
        price: 0,     //  费用
        online_num: 0,    //  在线人数
        in_game: false,     //  显示 操作界面
        username: null,     //  用户昵称
        uid: null,    //  用户id
        deviceid: null,  //  设备id
        token: null,
        match_id: null,   //  ???
      }
    },
    created(){
      this.loading.show();
      this.userName = this.playerUserName;
      this.uid = this.playerUid;
      this.balance = this.cookie.get('balance') || 0;
      this.deviceid = this.$route.query.id;
      this.token = this.cookie.get('token');
      this.uid = this.cookie.get('id');
      this.ajax('enterDeviceRoom', `token=${this.token}&deviceid=${this.deviceid}`, this.init)

    },
    methods: {
      init(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else {
          this.price = d.data.price;
          this.online_num = d.data.online_num;
        }
      },
      sendCaozuo(type){
        let fund = {
          "13": this.play,
        };
        send(type, fund[type])
      },
      play(){
//          申请链接设备
        const _this = this;
        this.loading.show("连接中");
        this.ajax('connect', `token=${this.token}&deviceid=${this.deviceid}`, function (d) {
          _this.loading.hide();
          if (d.status === 1) {
            _this.match_id = d.data.match_id;
            _this.sendCaozuo(13, function () {
              _this.in_game = true;
            });
          }
          else if (d.status === 0) _this.toast(`${d.data.user_nicename}正在游戏`);
          else _this.toast(d.descrp)
        });

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
