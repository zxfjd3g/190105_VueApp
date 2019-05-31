/*
入口js
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'

// 声明使用vue插件
Vue.use(VueResource) // 内部给Vue的原型对象上添加了一个能发ajax请求的属性对象$http


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>'
})
