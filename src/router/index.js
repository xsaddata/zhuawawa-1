import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: '404',
      meta: {
        title: 'notFound'
      },
      component: function (resolve) {
        require(['@/pages/notFound'], resolve)
      }
    }, {
      path: '/home',
      name: 'home',
      meta: {
        title: '首页'
      },
      component: function (resolve) {
        require(['@/pages/home/home'], resolve)
      }
    }, {
      path: '/my',
      name: 'my',
      meta: {
        title: '我的'
      },
      component: function (resolve) {
        require(['@/pages/my/index/my'], resolve)
      }
    }, {
      path: '/exchange',
      name: 'exchange',
      meta: {
        title: '奖品兑换'
      },
      component: function (resolve) {
        require(['@/pages/my/exchange'], resolve)
      }
    }, {
      path: '/service',
      name: 'service',
      meta: {
        title: '客服中心'
      },
      component: function (resolve) {
        require(['@/pages/my/service'], resolve)
      }
    }, {
      path: '/news',
      name: 'news',
      meta: {
        title: "消息通知"
      },
      component: function (resolve) {
        require(['@/pages/my/news'], resolve)
      }
    }, {
      path: '/recharge',
      name: 'recharge',
      meta: {
        title: '充值'
      },
      component: function (resolve) {
        require(['@/pages/my/recharge'], resolve)
      }
    }, {
      path: '/set',
      name: 'set',
      meta: {
        title: '设置'
      },
      component: function (resolve) {
        require(['@/pages/set'], resolve)
      }
    }, {
      path: '/nav',
      name: 'header',
      component(resolve){
        require(['@/components/nav'], resolve)
      }
    }
  ],
})

