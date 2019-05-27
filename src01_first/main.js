/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'

new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>'
})