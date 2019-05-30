/* 
  自定义的全局事件总线模块
  1). EventBus: 包含所有功能的全局事件总线对象
  2). EventBus.on(eventName, listener): 绑定事件监听
  3). EventBus.emit(eventName, data): 分发事件
  4). EventBus.off(eventName): 解绑事件监听
*/
(function (window) {
  
  const EventBus = {}

  // 存储所有监听回调函数的对象容器
  // 内部结构: {'add': [listener1, listener2], 'delete': [lisener3]}
  let listenersContainer = {}

  /* 
    绑定事件监听
    eventName: 事件名
    listener: 监听的回调函数
  */
  EventBus.on = function (eventName, listener) {
    // 找到当前事件名对应的监听数组容器
    let listeners = listenersContainer[eventName]
    // 如果数组容器不存在, 创建一个新的, 并添加到对象容器
    if (!listeners) {
      listeners = []
      listenersContainer[eventName] = listeners
    }
    listeners.push(listener)
  }

  /* 
  分发事件, 触发对应的监听回调执行
  eventName: 事件名
  data: 要传递给监听回调函数的数据
  */
  EventBus.emit = function (eventName, data) {
    // 根据eventName去listenersContainer找对应的所有监听回调的数组
    const listeners = listenersContainer[eventName]
    // 如果存在, 同步执行所有监听回调
    if (listeners && listeners.length>0) {
      listeners.forEach(listener => {
        listener(data)
      });
    }
  }

  /* 
  解绑事件监听
  eventName: 事件名, 如果不指定解绑所有监听
  */
 EventBus.off = function (eventName) {
   if (eventName===undefined) {
     listenersContainer = {}
   } else {
    //  delete listenersContainer[eventName]
    listenersContainer[eventName] = []
   }
 }

  window.EventBus = EventBus
})(window)