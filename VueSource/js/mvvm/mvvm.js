/*
相当于Vue的构造函数
options: 配置对象
*/
function MVVM(options) {
  // 保存配置对象到vm上
  this.$options = options;
  // 保存data对象到vm和data变量
  var data = this._data = this.$options.data;
  // 保存vm到me变量
  var me = this;

  // 遍历data中的每个属性
  Object.keys(data).forEach(function (key) {
    // 对指定属性名的属性实现数据代理
    me._proxy(key);
  });

  // 对data中所有层次属性实现数据劫持/监视
  observe(data, this);

  // 创建一个编译对象, 对模板进行编译 ==> 初始化显示
  this.$compile = new Compile(options.el || document.body, this)
}

MVVM.prototype = {
  $watch: function (key, cb, options) {
    new Watcher(this, key, cb);
  },

  _proxy: function (key) {
    // 保存vm到me
    var me = this;
    // 给vm添加指定属性名的属性(使用属性描述符)
    Object.defineProperty(me, key, {
      configurable: false, // 不让重新定义
      enumerable: true, // 可以枚举
      // 当通过vm.name读取属性值自动调用
      get: function proxyGetter() {
        // 读取data中对应的属性值返回
        return me._data[key];
      },
      // 当通过vm.name=xxx修改值时自动调用
      set: function proxySetter(newVal) {
        // 将最新的值保存到data对应的属性上
        me._data[key] = newVal;
      }
    });
  }
};
