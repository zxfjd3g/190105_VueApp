/*
入口js
 */
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { // 注册组件: 指定组件标签名
    App,
  },
  template: '<App/>',
  store, // 配置vuex的store, 内部在Vue原型对象添加了一个属性, $store
})

/*
store对象内部结构
1. 读取状态数据
  state: 包含vuex管理的所有状态数据的对象
  getters: 包含vuex所有getter计算的对象
2. 更新状态数据
  dispatch(): 触发action调用
  commit(): 触发mutation调用
*/
