/* 
  自定义的消息订阅-发布机制的模块
  1).PubSub: 包含所有功能的订阅 / 发布消息的管理者
  1).PubSub.subscribe(msg, subscriber): 订阅消息: 指定消息名和订阅者回调函数
  2).PubSub.publish(msg, data): 异步发布消息: 指定消息名和数据
  3).PubSub.publishSync(msg, data): 同步发布消息: 指定消息名和数据
  4).PubSub.unsubscribe(flag): 取消订阅: 根据标识取消某个或某些消息的订阅
*/
(function (window) {
  // 包含所有功能的订阅 / 发布消息的管理者
  const PubSub = {}
  // 用来存储所有订阅者回调函数的对象容器
  /* 
  内部结构: 
  {
    add: {
      'id-1': subscriber1,
      'id-2': subscriber2
    },
    delete: {
      'id-3': subscriber3
    }
  }
  */
  let subscribersContainer = {}
  let id = 0

  /* 
  订阅消息: 指定消息名和订阅者回调函数
  msg: 消息名
  subscriber: 订阅者回调函数
  */
  PubSub.subscribe = function (msg, subscriber) {
    // 找到对应的所有订阅者对象容器
    let subscribers = subscribersContainer[msg]
    
    // 如果不存在, 创建一个新的对象容器, 并保存到大容器
    if (!subscribers) {
      subscribers = {}
      subscribersContainer[msg] = subscribers
    }
    
    // 为新的订阅者生成一个唯一标识
    const token = 'id-' + ++id

    // 将新的订阅者回调添加到subscribers中
    subscribers[token] = subscriber

    // 返回订阅者的标识
    return token
  }

  /* 
  异步发布消息: 指定消息名和数据
  msg: 消息名
  data: 需要传递的数据
  */
  PubSub.publish = function (msg, data) {
    // 得到对应的所有订阅者对象容器
    const subscribers = subscribersContainer[msg]
    if (subscribers) {
      // 遍历异步调用所有的订阅者回调
      setTimeout(() => {
       Object.values(subscribers).forEach(subscriber => subscriber(data))
      })
    }
  }

  /* 
   同步发布消息: 指定消息名和数据
   msg: 消息名
   data: 需要传递的数据
   */
  PubSub.publishSync = function (msg, data) {
    // 得到对应的所有订阅者对象容器
    const subscribers = subscribersContainer[msg]
    if (subscribers) {
      // 遍历同步调用所有的订阅者回调
      Object.values(subscribers).forEach(subscriber => subscriber(data))
    }
  }


  /* 
   取消订阅: 根据标识取消某个或某些消息的订阅
   flag: 标记
      undefined: 取消所有订阅者
      token: 取消对应的一个订阅者
      msg: 取消对应的所有订阅者

   */
  PubSub.unsubscribe = function (flag) {
    // 1. undefined: 取消所有订阅者
    if (flag === undefined) {
      subscribersContainer = {}
    // 2. token: 取消对应的一个订阅者
    } else if (flag.indexOf('id-')===0) {
      // 找到对应的subscribers对象容器
      const subscribers = Object.values(subscribersContainer).find(subscribers => subscribers.hasOwnProperty(flag))
      // 如果存在, 删除对应的属性
      subscribers && delete subscribers[flag]

    // 3. msg: 取消对应的所有订阅者
    } else {
      delete subscribersContainer[flag]
    }

    
    
  }

  window.PubSub = PubSub
})(window)
