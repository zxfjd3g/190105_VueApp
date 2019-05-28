/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import Item from './components/Item.vue'
// import './base.css'

Vue.filter() // 注册全局过滤器
Vue.directive() // 注册全局指令
Vue.component('Item', Item) // 注册全局组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>'
})
