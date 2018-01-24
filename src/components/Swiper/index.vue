<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div v-for="(item,index) in list"
           @click="go(index)"
           class="swiper-slide"
           :style="{ backgroundImage: 'url(' + item.url + ')' }">
      </div>
    </div>
    <!--<div class="swiper-pagination swiper-pagination-white"></div>-->
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  export default {
    name: 'Swiper',
    props: {
      click_img: {
        type: Function
      },
      list: {
        type: Array,
        default(){
          return [
            {
              url: "https://static.vux.li/demo/2.jpg",
              link: ""
            }
          ]
        }
      }
    },
    data () {
      return {}
    },
    created(){

    },
    mounted() {
      let swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 600,
        autoplay: 4000,
        onTouchEnd: function () {
          swiper.startAutoplay()
        }
      });
    },
    methods: {
      go(i){
        let link = this.list[i].link;
        if (link !== "") {
          if (this.click_img) this.click_img(link);
          else this.$router.push(link);
        }
      }
    }
  }
</script>


<style scoped lang="less" rel="stylesheet/less">
  @import "./index.less";
</style>
