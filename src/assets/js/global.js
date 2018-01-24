/**
 * Created by root on 2018/1/2.
 * 全局函数、变量
 */
import url from './url';


let global = function (Vue, cookie) {
  Vue.prototype.url = url;
  Vue.prototype.alert = function (content, title = '提示') {
    this.$vux.alert.show({
      title: title,
      content: content,
    })
  };
  Vue.prototype.toast = function (content, position = 'top', type = 'text') {
    this.$vux.toast.show({
      text: content,
      position: position,
      width: '8rem',
      type: type
    })
  };
  Vue.prototype.loading = {
    show(text = 'Loading'){
      Vue.$vux.loading.show({text: text});
    },
    hide(){
      Vue.$vux.loading.hide()
    }
  };
  Vue.prototype.cookie = cookie;
  Vue.prototype.ajax = function (url, datas, fund, method = "POST", head = {}) {
    Vue.http({
      method: method,
      headers: {"Content-type": "application/x-www-form-urlencoded"},
      url: this.url.host + this.url.api[url],
      data: datas
    }).then(function (response) {
      fund(response.data)
    }).catch(function (err) {
      console.log(err);
      fund({})
    });
  };
  Vue.prototype.out = function () {
    this.cookie.remove("token");
  }
};

export default global;
