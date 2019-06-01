/*
入口js
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

import App from './App.vue'
import store from './store'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>',
  store
})
