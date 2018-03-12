<template>
  <div class="choujiang page">
    <div class="overplus">{{overplus}}</div>
    <div class="wheel">
      <canvas class="item" width="422px" height="422px" ref="canvas"></canvas>
      <img class="pointer" src="./pointer.png"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'choujiang',
    data () {
      return {
        overplus: 2,        //  剩余抽奖次数
        prize: null,        //  奖品
      }
    },
//    created(){
//
//    },
    mounted: function () {
      this.$nextTick(function () {
        this.loading.show();
        this.get_prize();
      })
    },
    methods: {
      get_prize(d){
        this.loading.hide();
//        if (d.code !== 200) this.toast(d.describe);
//        else {
//
//        }
        this.prize = [
          {
            id: 1,
            img: "./static/img/jiangpin1.png",
            bgColor: "#123456",
            aaa: "一等奖"
          }, {
            id: 2,
            img: "./static/img/jiangpin2.png",
            bgColor: "#654321",
            aaa: "2等奖"
          }, {
            id: 3,
            img: "./static/img/jiangpin3.png",
            bgColor: "#456789",
            aaa: "3等奖"
          }, {
            id: 4,
            img: "./static/img/jiangpin4.png",
            bgColor: "#987654",
            aaa: "4等奖"
          }, {
            id: 6,
            img: "./static/img/jiangpin5.png",
            bgColor: "#963258",
            aaa: "5等奖"
          }, {
            id: 7,
            img: "./static/img/jiangpin6.png",
            bgColor: "#457812",
            aaa: "6等奖"
          }, {
            id: 8,
            img: "./static/img/jiangpin6.png",
            bgColor: "#986532",
            aaa: "7等奖"
          }, {
            id: 9,
            img: "./static/img/jiangpin6.png",
            bgColor: "#357951",
            aaa: "8等奖"
          }, {
            id: 10,
            img: "./static/img/jiangpin6.png",
            bgColor: "#568423",
            aaa: "9等奖"
          }, {
            id: 11,
            img: "./static/img/jiangpin6.png",
            bgColor: "#964158",
            aaa: "10等奖"
          }, {
            id: 12,
            img: "./static/img/jiangpin6.png",
            bgColor: "#642800",
            aaa: "11等奖"
          }, {
            id: 12,
            img: "./static/img/jiangpin6.png",
            bgColor: "#095068",
            aaa: "12等奖"
          },
        ];
        this.init_canvas();
      },
      init_canvas(){
        let canvas = this.$refs.canvas;
        let baseAngle = Math.PI * 2 / (this.prize.length);

        let ctx = canvas.getContext("2d");
        let canvasW = canvas.width;
        let canvasH = canvas.height;
        ctx.clearRect(0, 0, canvasW, canvasH);
        ctx.strokeStyle = "#fff6c9";
        ctx.font = '16px Microsoft YaHei';
        for (let i = 0; i < this.prize.length; i++) {
          let img = new Image();
          img.src = this.prize[i].img;

          let angle = i * baseAngle;
          ctx.fillStyle = this.prize[i].bgColor;
          ctx.beginPath();
//          绘制转板
          ctx.arc(canvasW * .5, canvasH * .5, 192, angle, angle + baseAngle, false);
          ctx.arc(canvasW * .5, canvasH * .5, 0, angle, angle + baseAngle, true);
          ctx.stroke();
          ctx.fill();
          ctx.save();
//          绘制奖品
          ctx.fillStyle = "#e5302f";
          let rewardName = this.prize[i].aaa;
          let line_height = 17;
          let translateX = canvasW * .5 + Math.cos(angle + baseAngle * .5) * 155;
          let translateY = canvasH * .5 + Math.sin(angle + baseAngle * .5) * 155;
          ctx.translate(translateX, translateY);

          ctx.rotate(angle + baseAngle * .5 + Math.PI * .5);
          ctx.font = '16px Microsoft YaHei';
          ctx.fillText(rewardName, -ctx.measureText(rewardName).width / 2, line_height);

          img.onload=function(){
            ctx.drawImage(img,-15,10);
          };
          ctx.drawImage(img,-15,10);
          ctx.restore();
        }
      },
    },
    directives: {}
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
