// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './assets/js/rem'
import {AjaxPlugin, cookie, LoadingPlugin, AlertPlugin, ToastPlugin, WechatPlugin} from "vux"
import global from './assets/js/global'
import infiniteScroll from 'vue-infinite-scroll'

//  页面加载进度条
router.beforeEach((to, from, next) => {
  NProgress.start();
  let token = cookie.get('token');
  let noToken = ["login", "404", "home"].includes(to.name);
  if (token) next();
  else if (noToken) next();
  else next("/login");


  // if(to.name === "404" && )
  // function getUrlData(name) {
  //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  //   var r = window.location.search.substr(1).match(reg);
  //   if (r !== null)return unescape(r[2]);
  //   return null;
  // }


  // if (to.name === "404" && getUrlData('code')) next('/home?code=' + getUrlData('code'));
  // else if (noToken || home_code || token) next();
  // else next("/login");
});
router.afterEach((to) => {
  NProgress.done();
});

Vue.use(require('vue-wechat-title'))
Vue.use(AjaxPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)
Vue.directive('infiniteScroll', infiniteScroll)

//  全局变量、方法
global(Vue, cookie)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
