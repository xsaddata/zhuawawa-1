<template>
  <div class="game page">
    <vNav></vNav>
    <span class="diamond">{{balance}}</span>
    <div class="video position">
      <canvas v-video style="width:100%;height:100%;"></canvas>
    </div>
    <div class="controller position">
      <span class="room fl">{{'4'}}人在房间</span>
      <span class="switch_video fr"></span>
    </div>
  </div>
</template>

<!--<script src="./socket.js"></script>-->
<script>

  import{vNav} from "@/components"
  import Kinlink from "./kinlink";
  export default {
    name: 'page',
    components: {vNav},
    data () {
      return {
        balance: null,
      }
    },
    created(){
      this.balance = this.cookie.get('balance') || 0;

    },
    methods: {},
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
