webpackJsonp([12],{FCgj:function(t,e,n){"use strict";function i(t){n("VKYZ")}Object.defineProperty(e,"__esModule",{value:!0});var a=n("bGai"),s={name:"news",components:{vNav:a.b},data:function(){return{list:null,limit_begin:0,limit_num:20}},created:function(){var t=this.cookie.get("token");t&&this.ajax("get_note","token="+t+"&limit_num="+this.limit_num+"&limit_begin="+this.limit_begin,this.get_note)},methods:{get_note:function(t){200!==t.code?this.toast(t.descrp||"链接服务器失败"):this.list=t.info}}},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"news page"},[n("vNav",{staticClass:"nav"},[t._v("消息通知")]),t._v(" "),null!==t.list?n("div",{staticClass:"list"},t._l(t.list,function(e,i){return n("div",{key:i,staticClass:"item"},[n("div",{staticClass:"tiem"},[t._v(t._s(e.update_time))]),t._v(" "),n("div",{staticClass:"content"},[n("h5",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),n("img",{staticClass:"banner",attrs:{src:e.img}}),t._v(" "),n("p",{staticClass:"text"},[t._v(t._s(e.content))])])])})):t._e()],1)},r=[],c={render:o,staticRenderFns:r},A=c,l=n("VU/8"),d=i,m=l(s,A,!1,d,"data-v-c6db3cae",null);e.default=m.exports},TAAR:function(t,e,n){e=t.exports=n("FZ+f")(!0),e.push([t.i,"\n.list .item .tiem[data-v-c6db3cae] {\n  height: 0.7rem;\n  line-height: 0.7rem;\n  width: 3.54rem;\n  margin: 0.47rem auto;\n  background: #d7d4d4;\n  color: white;\n  font-size: .32rem;\n  text-align: center;\n  border-radius: .08rem;\n  overflow: hidden;\n}\n.list .item .content[data-v-c6db3cae] {\n  padding: 0 .66rem;\n  background-color: #fff;\n}\n.list .item .content .title[data-v-c6db3cae] {\n  height: 1.37rem;\n  line-height: 1.37rem;\n  font-size: .4rem;\n}\n.list .item .content .banner[data-v-c6db3cae] {\n  width: 100%;\n}\n.list .item .content .text[data-v-c6db3cae] {\n  padding: .48rem 0;\n  line-height: .55rem;\n  color: #999;\n}\n","",{version:3,sources:["/private/var/root/Desktop/娃娃机_vux/src/pages/my/news/index.vue"],names:[],mappings:";AACA;EACE,eAAe;EACf,oBAAoB;EACpB,eAAe;EACf,qBAAqB;EACrB,oBAAoB;EACpB,aAAa;EACb,kBAAkB;EAClB,mBAAmB;EACnB,sBAAsB;EACtB,iBAAiB;CAClB;AACD;EACE,kBAAkB;EAClB,uBAAuB;CACxB;AACD;EACE,gBAAgB;EAChB,qBAAqB;EACrB,iBAAiB;CAClB;AACD;EACE,YAAY;CACb;AACD;EACE,kBAAkB;EAClB,oBAAoB;EACpB,YAAY;CACb",file:"index.vue",sourcesContent:["\n.list .item .tiem[data-v-c6db3cae] {\n  height: 0.7rem;\n  line-height: 0.7rem;\n  width: 3.54rem;\n  margin: 0.47rem auto;\n  background: #d7d4d4;\n  color: white;\n  font-size: .32rem;\n  text-align: center;\n  border-radius: .08rem;\n  overflow: hidden;\n}\n.list .item .content[data-v-c6db3cae] {\n  padding: 0 .66rem;\n  background-color: #fff;\n}\n.list .item .content .title[data-v-c6db3cae] {\n  height: 1.37rem;\n  line-height: 1.37rem;\n  font-size: .4rem;\n}\n.list .item .content .banner[data-v-c6db3cae] {\n  width: 100%;\n}\n.list .item .content .text[data-v-c6db3cae] {\n  padding: .48rem 0;\n  line-height: .55rem;\n  color: #999;\n}\n"],sourceRoot:""}])},VKYZ:function(t,e,n){var i=n("TAAR");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n("rjj0")("b225734a",i,!0)}});
//# sourceMappingURL=12.7a83184a3f41b9cc771c.js.map