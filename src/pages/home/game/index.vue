<template>
  <div class="game page">
    <vNav></vNav>
    <span class="diamond">{{balance}}</span>
    <div class="video position">
      <canvas v-video style="width:100%;height:100%;"></canvas>
    </div>
    <div class="controller position">
      <span class="room fl">{{'4'}}人在房间</span>
      <!--切换按钮-->
      <span class="switch_video fr" @click="sendCaozuo(12)"></span>

      <div class="layui-row" id="guanzhong" style="text-align:center">
        <div id="caozuo_connect" @click="sendCaozuo(13)" class="layui-btn layui-btn-normal layui-btn-sm">
          开始游戏
        </div>
      </div>
      <div class="layui-row" id="player">
        <table style="margin:50px auto;width: 280px">
          <tr>
            <td></td>
            <td>
              <div @touchstart="sendCaozuo(2)" @touchend="sendCaozuo(16)"
                   class="layui-btn layui-btn-normal layui-btn-sm">上
              </div>
            </td>
            <td></td>
            <td></td>
            <td>
              <div class="layui-btn layui-btn-normal layui-btn-sm">切换</div>
            </td>
          </tr>
          <tr>
            <td>
              <div @touchstart="sendCaozuo(4)" @touchend="sendCaozuo(16)"
                   class="layui-btn layui-btn-normal layui-btn-sm">左
              </div>
            </td>
            <td></td>
            <td>
              <div @touchstart="sendCaozuo(5)" @touchend="sendCaozuo(16)"
                   class="layui-btn layui-btn-normal layui-btn-sm">右
              </div>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td>
              <div @touchstart="sendCaozuo(3)" @touchend="sendCaozuo(16)"
                   class="layui-btn layui-btn-normal layui-btn-sm">下
              </div>
            </td>
            <td></td>
            <td></td>
            <td>
              <div id="caozuo_go" @click="sendCaozuo(11)" class="layui-btn layui-btn-normal layui-btn-sm">下爪</div>
            </td>
          </tr>
        </table>
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
