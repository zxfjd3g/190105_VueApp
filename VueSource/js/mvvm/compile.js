function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果el元素存在
  if (this.$el) {
    // 1. 取出el中所有子节点封装成fragment对象并保存
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所有层次子节点
    this.compileElement(this.$fragment);
    // 3. 将fragment添加为el的子节点 ==> 显示编译后的结果
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  /*
  编译指定节点的所有子节点
  */
  compileElement: function (el) {
    // 得到最外层子节点
    var childNodes = el.childNodes,
      me = this;
    // 遍历子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点文本内容
      var text = node.textContent;
      // 用来匹配插件文本的正则对象
      var reg = /\{\{(.*)\}\}/; // {{name}}
      // 如果节点是element
      if (me.isElementNode(node)) {
        // 编译元素节点的所有指令属性
        me.compile(node);
      // 如果节点是一个插值格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译插值文本节点
        me.compileText(node, RegExp.$1);
      }

      // 如果子节点还有子节点, 递归调用实现所有层次子节点的编译
      if (node.childNodes && node.childNodes.length) {
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 得到所有的属性节点
    var nodeAttrs = node.attributes,
      me = this;
    // 遍历每个属性节点
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 得到属性名: v-on:click
      var attrName = attr.name;
      // 如果是指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值/表达式: update
        var exp = attr.value;
        // 得到指令名: on:click
        var dir = attrName.substring(2);
        // 如果是事件指令
        if (me.isEventDirective(dir)) {
          // 解析事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
        // 如果是普通指令
        } else {
          // 解析普通指令
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }
        // 删除指令属性
        node.removeAttribute(attrName);
      }
    });
  },

  // 编译插值文本节点
  compileText: function (node, exp) {
    // 调用编译工具对象来编译
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

/*
包含n个解析模板语法的方法的对象
*/
var compileUtil = {
  // 解析 v-text/ {{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  //  解析 v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  //  解析 v-model
  model: function (node, vm, exp) {
    this.bind(node, vm, exp, 'model');

    var me = this,
      val = this._getVMVal(vm, exp);
    node.addEventListener('input', function (e) {
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }

      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  //  解析 v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  真正解析的方法
  node: 需要解析的节点(text/element)
  vm: 包含了数据的vm对象
  exp: 表达式
  dir: 指令名: text/html/model/class
  */
  bind: function (node, vm, exp, dir) {
    // 得到更新节点的函数
    var updaterFn = updater[dir + 'Updater'];
    // 如果函数存在, 执行更新函数更新节点(第一次更新==> 初始化)
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    new Watcher(vm, exp, function (value, oldValue) {
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 解析处理事件指令
  eventHandler: function (node, vm, exp, dir) {
    // 得到事件名/类型: click
    var eventType = dir.split(':')[1],
    // 得到事件监听回调函数(根据表达式从methods中取出)
      fn = vm.$options.methods && vm.$options.methods[exp];
    if (eventType && fn) {
      // 给元素节点绑定指定事件名和回调函数的DOM事件监听(强制绑定回调函数的this为vm)
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};


/*
包含n个用于更新dom节点的方法的对象
*/
var updater = {
  // 更新节点的textContent属性
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML属性
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className属性
  classUpdater: function (node, value, oldValue) {
    var className = node.className;  // classB


    node.className = className ? (className + ' ' + value) : value
  },

  // 更新节点的value属性
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};
