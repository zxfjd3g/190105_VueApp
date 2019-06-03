function Observer(data) {
  // 保存data数据
  this.data = data;
  // 启动监视
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    var me = this;
    // 遍历data每个属性
    Object.keys(data).forEach(function (key) {
      // 将其定义一个响应式属性(有数据劫持/监视)
      me.defineReactive(data, key, data[key]);
    });
  },
  defineReactive: function (data, key, val) {
    // 创建一个对应的dep对象(与属性一一对应)
    var dep = new Dep();
    // 通过隐式递归调用, 实现对所有层次属性的劫持/监视
    var childObj = observe(val);
    // 给data重新定义指定的属性(添加set/get)
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      // get负责建立dep与watcher之间的关系
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知对应的dep
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  // 如果value不是对象, 直接结束
  if (!value || typeof value !== 'object') {
    return;
  }

  // 创建一个对应的观察者对象
  return new Observer(value);
};


var uid = 0;

/*
  一个dep对象与data中的属性一一对应
*/
function Dep() {
  this.id = uid++;
  this.subs = []; // subscribers订阅者(watcher)的数组
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历每个订阅者watcher, 通知数据变化了
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;
