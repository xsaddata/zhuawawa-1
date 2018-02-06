import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let title = "快抓娃娃机";
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
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: function (resolve) {
        require(['@/pages/login'], resolve)
      }
    }, {
      path: '/home',
      name: 'home',
      meta: {
        title: title
      },
      component: function (resolve) {
        require(['@/pages/home/index/home'], resolve)
      }
    }, {
      path: '/game',
      name: 'game',
      meta: {
        title: title
      },
      component: function (resolve) {
        require(['@/pages/home/game'], resolve)
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
      path: '/address',
      name: 'address',
      meta: {
        title: '收货地址'
      },
      component: function (resolve) {
        require(['@/pages/my/address'], resolve)
      }
    }, {
      path: '/add_address',
      name: 'add_address',
      meta: {
        title: '新增收货地址'
      },
      component: function (resolve) {
        require(['@/pages/my/add_address'], resolve)
      }
    }, {
      path: '/gold_notes',
      name: 'gold_notes',
      meta: {
        title: '金币记录'
      },
      component: function (resolve) {
        require(['@/pages/my/gold_notes'], resolve)
      }
    }, {
      path: '/grad',
      name: 'grad',
      meta: {
        title: '抓取记录'
      },
      component: function (resolve) {
        require(['@/pages/my/grad'], resolve)
      }
    }, {
      path: '/note',
      name: 'note',
      meta: {
        title: "消息通知"
      },
      component: function (resolve) {
        require(['@/pages/my/news'], resolve)
      }
    }, {
      path: '/integral',
      name: 'integral',
      meta: {
        title: "积分记录"
      },
      component: function (resolve) {
        require(['@/pages/my/integral'], resolve)
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
      path: '/mall',
      name: 'mall',
      meta: {
        title: '积分商城'
      },
      component(resolve){
        require(['@/pages/mall/index'], resolve)
      }
    }
  ],
})

