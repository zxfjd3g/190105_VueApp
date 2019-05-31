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

/*
创建一个vm作为事件总线对象保存Vue原型对象(所有组件对象都直接可见)
  $on(): 绑定事件监听
  $emit(): 分发事件
  $off(): 解除事件绑定
 */
Vue.prototype.$bus = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>'
})
