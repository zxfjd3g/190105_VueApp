/*
一个watcher对象与模板中的表达式一一对应
*/
function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.depIds = {}; // dep0, dep1   {0: dep0, 1: dep1}
  // 获取当前表达式对应的值 ===> 内部会去建立watche与 dep的关系
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    var value = this.get();
    var oldVal = this.value;
    if (value !== oldVal) {
      this.value = value;
      // 调用更新节点的回调函数
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 判断关系是否已经建立过
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 将watcher添加到dep中去: 建立dep到watcher关系
      dep.addSub(this);
      // 将dep添加到watcher中去, 建立watcher到dep的关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};
