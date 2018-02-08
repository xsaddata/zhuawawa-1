<template>
  <div class="game page">
    <vNav></vNav>
    <span class="diamond" @click="$router.push('recharge')">{{balance}}</span>
    <div class="video position">
      <canvas v-video style="width:100%;height:100%;"></canvas>
    </div>
    <div class="controller position">
      <!--<span class="room fl">{{online_num}}人在房间</span>-->
      <!--切换按钮-->
      <span class="switch_video fr" @click="sendCaozuo(12)" v-show="in_game"></span>


      <ul class="ganme_connect" v-show="!in_game">
        <li class="li fl w25">
          <!--<span class=" btn record"></span>-->
        </li>
        <li class="li fl w50" @click="play">
      <span class=" btn play">
      开始游戏 <br>
      <i class="price">x{{price}}</i>
      </span>
        </li>
        <li class="li fl w25">
          <!--<span class=" btn chat"></span>-->
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

    <ul class="history">

    </ul>

  </div>
</template>

<!--<script src="./socket.js"></script>-->
<script>

  import{vNav} from "@/components"
  import Kinlink from "./kinlink";
  //  import send from "./caozuo";

  const socket = io("http://123.56.29.65:8003", {'transports': ['websocket', 'polling']}); //信令
  socket.on('user joined', function (data) {
    console.log(data);

  });
  socket.on('user left', function (data) {
    console.log(data);

  });

  socket.on('privateReceive', function (data) {
    console.log("=================");
    console.log(data);
    switch (data.messageType) {
      case 14:
        play();
        break;
    }

  });

  socket.on('new message', function (data) {
    console.log(data);
    let jsonData = JSON.parse(data);
    console.log(jsonData)
    switch (jsonData.messageType) {
      case 9:
        console.log("抓住了")
        break;
      case 10:
        console.log("没抓住")
        break;
    }
    // $("#container").append("<h5>" + jsonData.messageType + jsonData.messageContent + "</h5>");

  });

  const sendCaozuo = function (data, fund) {
    if (data.messageType === 13) play = fund;
    socket.emit('privateSend', {
      uid: data.uid,
      remoteUid: "10000",
      playerUid: data.playerUid,
      playerUserName: data.playerUserName,
      playerAvatar: data.playerAvatar,
      matchID: data.matchID,
      messageType: data.messageType
    });
  };

  let sendMessage = function (message) {
    socket.emit('new message', {
      uid: uid,
      remoteUid: remoteUid,
      messageContent: message,
      userName: userName,
      playerAvatar: playerAvatar,
      userAvatar: userAvatar,
      messageType: NORMAL

    });
  }
  let play;
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
        avatar: null,     //  头像
        deviceid: null,  //  设备id
        token: null,
        match_id: null,   //  ???
      }
    },
    created(){
      this.loading.show();
      this.userName = this.cookie.get('username');
      this.uid = this.playerUid;
      this.balance = this.cookie.get('balance') || 0;
      this.deviceid = this.$route.query.id;
      this.token = this.cookie.get('token');
      this.uid = this.cookie.get('id');
      this.avatar = this.cookie.get('avatar');
      this.ajax('enterDeviceRoom', `token=${this.token}&deviceid=${this.deviceid}`, this.init);
      socket.emit('user joined', {
        username: this.userName,
        uid: this.uid,
        channel: this.deviceid
      });

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
        let data = {
          uid: this.uid,
          remoteUid: this.deviceid,
          playerUid: this.uid,
          playerUserName: this.userName,
          playerAvatar: this.avatar,
          matchID: this.match_id,
          messageType: type
        };
        let fund = {
          "13": this.apply_pay,
        };
        if (type === 11) this.in_game = false;
        sendCaozuo(data, fund[type])
      },
      play(){
//          申请链接设备
//        this.sendCaozuo(13);
        const _this = this;
        this.loading.show("连接中");
        this.ajax('connect', `token=${this.token}&deviceid=${this.deviceid}`, function (d) {
          _this.loading.hide();
          if (d.status === 1) {
            _this.match_id = d.data.match_id;
            _this.ajax('get_info', `id=${_this.uid}&token=${_this.token}`, function (d) {
              if (d.code === 200) {
                _this.cookie.set('balance', d.data.balance);
                _this.balance = d.data.balance
              }
            });
            _this.sendCaozuo(13);
          }
          else if (d.status === 0) _this.toast(`${d.data.user_nicename}正在游戏`);
          else if (d.status === 2) _this.toast(`${d.data.user_nicename}正在游戏1`);
          else _this.toast(d.descrp)
        });
      },
      apply_pay(){
        this.in_game = true;
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
