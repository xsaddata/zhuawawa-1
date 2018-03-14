<template>
  <div class="choujiang page">
    <div class="overplus">{{overplus}}</div>
    <div class="wheel">
      <canvas class="item" width="422px" height="422px" ref="canvas"
              :style="'transform: rotate('+deg+'deg);transition: transform 5s;'"
              @transitionend="rotate_stop">
      </canvas>
      <div v-if="overplus !== null" @click="luck_draw">
        <img v-if="overplus === '0'" class="pointer" src="./img/btn_choujiang.png"/>
        <img v-else class="pointer" src="./img/btn_mianfei.png"/>
      </div>
    </div>
    <div class="btns">
      <div class="btn fl" @click="share"></div>
      <div class="btn fl" @click="my_prize"></div>
    </div>
    <div class="my_prize" v-show="show_prize">
      <div class="my_prize_box">
        <div class="clear_box" @click="show_prize = false"></div>
        <img src="./img/my_prize_title.png" class="my_prize_title">
        <ul class="info" v-if="prize_log !== null && prize_log.length !== 0">
          <li class="log" v-for="(item,index) in prize_log" :key="index">
            <img :src="item.img" class="log_img">
            {{item.name}}
            <span class="fr">{{item.create_time}}</span>
          </li>
        </ul>
        <div v-else class="no_log">暂无中奖记录</div>
      </div>

    </div>
    <div class="explain">
      <img class="explain_title" src="./img/explain_title.png">
      <!--<p class="text">活动时间：2018年3月x日-2018年3月x日</p>-->
      <p class="text">活动规则：</p>
      <p class="text em2">1、每日有1次免费机会;</p>
      <p class="text em2">2、分享到微信可再获得一次免费机会;</p>
      <p class="text em2">3、每次抽奖消耗80金币;</p>
      <p class="text">奖品发放：</p>
      <p class="text em2">实物奖品在app内“我的娃娃”中查看提取；</p>
    </div>
    <div class="copyright">注：本活动最终解释权归《{{channel}}》运营团队所有</div>
  </div>
</template>

<script>
  export default {
    name: 'choujiang',
    data () {
      return {
        overplus: null,         //  剩余抽奖次数
        prize_list: null,       //  奖品列表
        bRotate: false,         //  false:停止；true: 旋转
        deg: -90,               //  旋转角度
        prize: null,            //  抽中的奖品
        num: 0,                 //  中奖次数
        channel: null,          //  口红娃娃机 || 快抓娃娃机
        token: null,            //  用户标识
        show_prize: false,      //  true: 显示中奖记录
        prize_log: null,        //  中奖记录
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        let channel = this.$route.query.channel;
        let token = this.$route.query.token;
        this.channel = channel ? decodeURI(channel) : "快来抓娃娃";

        if (!token) this.toast("请登录");
        else {
          this.loading.show();
          this.ajax("getPrize", `token=${token}`, this.get_prize);
          this.token = token;
        }
      })
    },
    methods: {
      get_prize(d){
        if (d.code !== 200) {
          this.loading.hide();
          this.toast(d.descrp);
        } else if (d.info.length > 0) {
          this.prize_list = d.info;
          this.overplus = d.number || 0;
          this.init_canvas();
        }
      },
      init_canvas(){
        let length = this.prize_list.length;
        if (length === 0) {
          this.loading.hide();
          this.toast("暂无抽奖数据，稍后重试");
          return;
        }
        let canvas = this.$refs.canvas;
        let baseAngle = Math.PI * 2 / length;
        let img_w = 100 - length * 5;

        let ctx = canvas.getContext("2d");
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.strokeStyle = "#fff6c9";
        ctx.font = '16px Microsoft YaHei';
        for (let i = 0; i < length; i++) {
          let img = new Image();
          img.src = this.prize_list[i].img;
          img.onload = function () {
            let angle = i * baseAngle;
            ctx.fillStyle = this.prize_list[i].bgColor;
            ctx.beginPath();
//          绘制转板
            ctx.arc(canvasW * .5, canvasH * .5, 192, angle, angle + baseAngle, false);
            ctx.arc(canvasW * .5, canvasH * .5, 0, angle, angle + baseAngle, true);
            ctx.stroke();
            ctx.fill();
            ctx.save();
//          绘制奖品
//            ctx.fillStyle = "#e5302f";
            let rewardName = this.prize_list[i].name;
            let line_height = 17;
            let translateX = canvasW * .5 + Math.cos(angle + baseAngle * .5) * 155;
            let translateY = canvasH * .5 + Math.sin(angle + baseAngle * .5) * 155;
            ctx.translate(translateX, translateY);

            ctx.rotate(angle + baseAngle * .5 + Math.PI * .5);
            ctx.font = '16px Microsoft YaHei';
            ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, 0);


            ctx.drawImage(img, -(img_w / 2), 0, img_w, img_w);
            ctx.drawImage(img, -(img_w / 2), 0, img_w, img_w);

            ctx.restore();
          }.bind(this)
        }
        this.bRotate = true;
        this.loading.hide();
      },
      luck_draw(){
        if (this.bRotate) {
          this.bRotate = false;
          this.loading.show();
          this.ajax("startPrize", `token=${this.token}`, this.rotate);
        }
      },
      rotate(d){
        this.loading.hide();
        if (d.code !== 200) this.toast(d.descrp);
        else if (d.info.id && d.number) {
          this.prize = d.info.id;
          this.overplus = d.number;
          this.num++;
          let deg = (360 / this.prize_list.length);
          this.deg = -( this.prize * deg + deg / 2 + this.num * 3600 + 90);
        } else this.toast("");
      },
      rotate_stop(){
        this.alert(`抽中${this.prize_list[this.prize].name}`);
        this.prize = null;
        this.bRotate = true;
      },
      share(){
        window.location.href = this.url.host + this.url.api.share + "?id=" + (this.$route.query.id || '');
      },
      my_prize(){
        if (this.prize_log === null) {
          this.loading.show();
          this.ajax('myPrize', `token=${this.token}`, function (d) {
            this.loading.hide();
            if (d.code !== 200) this.toast(d.descrp);
            else this.show_prize_log(d.info);
          }.bind(this));
        } else this.show_prize_log();

      },
      show_prize_log(d){
        if (d) this.prize_log = d;
        this.show_prize = true;
      }
    },
    directives: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
