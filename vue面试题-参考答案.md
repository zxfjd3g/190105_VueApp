# day01
## 1. 说说MVVM设计模式
    M: Model(模型), vue中是data(为view提供数据)
    V: View(视图), vue中是模板页面(显示data中的数据)
    VM: ViewModel(视图模型), vue中是Vue实例对象(管理者: 数据绑定/DOM监听) 
    
## 2. 说说你对计算属性的理解
    什么时候用计算属性?
       模板显示要显示的数据是根据n个已有的相关数据进行计算来确定
    getter: get方法, 当读取属性值时/相关数据发生了改变自动调用, 根据相关数据进行计算并返回结果, this就是vm
    setter: set方法, 当修改了当前属性的值自动调用, 监视属性值的变化去更新相关数据, this就是vm

## 3. 区别computed与method和watch
    1). computed与method: computed有缓存可以避免重复计算, 而method不可以
    2). computed与watch: 
        get(): 可以监视所有依赖数据, 编码简洁, 但只能同步计算产生一个需要显示的结果数据
        watch: 可以监视所有依赖数据, 编码麻烦, 可以进行异步/长时间处理后更新数据显示


## 4. 说说回调函数的判断及相关问题
    1. 什么函数?
        1). 你定义的
        2). 你没有调用
        3). 但最终执行了(在后面的某个时刻或者某个条件下)
    2. 关于回调函数相关的3个问题
        1). 什么时候调用
        2). 用来做什么的
        3). this是谁

## 5. 说说2种类型的数据容器
    1). 对象
      属性值才是我们要存的数据
      属性名是数据的标识名称, 根据标识名来操作数据
    2). 数组
      数组中的元素就是我们要存的数据
      元素的下标就是数据的标识名称, 根据标识名来操作数据
    3). 选择哪种容器
      一般有序的用数组, 不强调顺序的可用对象
      如果需要根据标识数据查找数据对象, 用对象容器比用数组容器效率高

## 6. git的6个基本操作
    1). 创建本地仓库
       创建.gitignore配置文件
       git init
       git add *
       git commit -m "xxx"
    2). 创建远程仓库
       New Repository
       指定名称
       创建
    3). 将本地仓库推送到远程仓库
       git remote add origin https://github.com/zxfjd3g/xxx.git 关联远程仓库
       git push origin master
    4). 如果本地有更新, 推送到远程
       git add *
       git commit -m "xxx"
       git push origin master
    5). 如果远程有更新, 拉取到本地
       git pull origin master
    6). 克隆远程仓库到本地
       git clone https://github.com/zxfjd3g/xxx.git
       
## 7. 函数的2个角色, 方法与属性, 方法与函数
    1). 函数的2个角色:
        函数: 通过()调用
        对象: 通过.操作属性或方法, 此时可以称之为函数对象
    2). 方法与属性
        方法是一个特别的属性: 属性值是函数
    3). 方法与函数
        在对象内定义的常称为方法, 通过对象调用的常称为方法, 其它常称为函数

# day02
## 1. data中的数组与对象属性不同处理
    数组: 重写数组更新数组元素的方法, 只要调用数组的这些方法, 就会更新相应的界面
    对象: 对对象中的属性进行setter监视, 只要设置了新的属性值, 就会更新相应的界面
    
## 2. 写出7个指令及其作用
    v-text: 设置标签体文本
    v-html: 设置标签体子标签
    v-if/v-else/v-show: 显示/隐藏
    v-for: 遍历显示列表
    v-bind: 强制绑定表达式, 简写:
    v-on: 绑定事件监听, 简写@
    v-model: 双向数据绑定
    
## 3. 写出vue 7个配置选项及其作用
    el: 最外层元素选择器
    props: 声明接收哪些属性
    data: 状态数据
    computed: 计算属性
    methods: 事件回调函数
    watch: 监视属性变化
    directives: 注册局部指令
    filters: 注册局部过滤器
    components: 局部注册组件
    
## 4. 说说vue的生命周期
    1). 初始化
       beforeCreate()
       created()
       beforeMount()
       mounted(): 异步任务(发ajax请求/启动定时器)
    2). 更新
       beforeUpdate()
       updated()
    3). 死亡
       beforeDestroy(): 收尾工作(清除定时器)
       destroyed()

## 5. 说说项目开发中常用的ES6新语法
    比较简单
    比较重要/有点难度的

    定义变量/常量: const/let
    解构赋值: let {a, b} = this.props / import {aa} from 'xxx' / function f ({name}) {}
    对象的简洁表达: {a, b, c () {}}
    箭头函数: 
       组件的自定义方法: xxx = () => {}
       匿名函数作为实参
       优点:
          * 简洁
          * 没有自己的this,使用引用this查找的是外部this
    扩展运算符: ...
    类: class/extends/constructor/super
    ES6模块化: export/default/import
    异步: promise, async/await

## 6. 比较函数的call()/apply()/bind()
    1). call(obj, param1, param2)/apply(obj, [[param1, param2])
       调用/执行函数
       只是强制指定函数中的this为第一个参数指定的对象
       如果函数执行需要传参数, call是依次传递, apply需要封装成数组传递
    2). bind(obj)
       返回一个新函数, 不会自动执行, 需要手动执行
       新函数内部会通过原函数对象的call来调用原本的函数, 并指定函数的this为obj
       如果直接调用原来函数, this没有绑定为obj
       
# day03

## 1. vm对象与组件对象的关系
    1). 组件对象的原型对象是一个vm对象
    2). 任何组件对象都能看到Vue原型对象上的属性/方法
    3). 一旦在Vue原型对象上添加属性/方法, 任何组件中都可以直接通过this来访问
    4). 基于vue的事件总线机制: 
        main.js中: Vue.prototype.$bus = new Vue(), 
        组件中: this.$bus.$on()/$emit()/$off()
        
## 2. 说说vue组件间通信的几种方式
    1). props
        父子组件间通信的基本方式
        属性值的2大类型: 
            一般: 父组件-->子组件
            函数: 子组件-->父组件
        隔层组件间传递: 必须逐层传递(麻烦)
        兄弟组件间: 必须借助父组件(麻烦)
    2). vue自定义事件
        方式1: 给子组件标签绑定事件监听
            子组件向父组件的通信方式
            功能类似于function props
            不适合隔层组件和兄弟组件间的通信
        方式2: 通过单独的vm对象作为事件总线绑定监听/分发事件
            任意组件间通信
    3). 消息订阅和发布(pubsub-js)
        适合于任何关系的组件间通信
        缺点: 管理不够集中
    4). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比pubsub强大, 更适用于vue项目
    5). slot
        父向子通信
        通信是带数据的标签
        注意: 标签是在父组件中解析

## 3. 组件化编码流程和2个重要问题
    1). 流程
        1. 拆分组件: 拆分界面, 定义组件
        2. 静态组件
        3. 动态组件
           1). 动态初始化显示
           2). 交互
    2). 2个问题
        1. 数据保存在哪个组件?   哪个组件需要还是哪些组件需要
        2. 更新数据的方法定义在哪个组件?   与数据同在一个组件

## 4. 详细说明如何判断函数中的this
    1). 正常情况: 执行函数的方式决定了函数中的this
       直接调用: fn()       window
       new调用: new fn()   新创建的对象 
       对象调用: obj.fn()   obj对象
       call/apply调用: fn.call(obj)   第一个参数指定的对象
    2). 特别情况:
       bind()返回的函数: fn2 = fn.bind(obj) fn2()第一个参数指定的对象
       箭头函数: 使用的外部的this(内部没有自己的this) fn = () => {} fn()
       回调函数
          定时器回调/ajax回调/数组遍历相关方法回调: window
          dom事件监听回调: dom元素
          组件生命周期回调: 组件对象
    3). 在开发我们经常会利用箭头函数/bind()来改变this的指向
    
## 5. 说说你对事件处理机制的理解
    1). DOM事件
       * 绑定事件监听
          * 事件名(类型): 只有有限的几个, 不能随便写
          * 回调函数: 接收包含相关数据的event, 处理事件
       * 用户操作界面自动触发事件(event)
          * 事件名(类型)
          * 数据: event
    2). 自定义事件(如vue自定义事件/事件总线/pubsub)
       * 绑定事件监听
          * 事件名(类型): 任意
          * 回调函数: 通过形参接收数据, 在函数体处理事件
       * 触发(emit)/分发(dispatch)事件(编码)
          * 事件名(类型): 与绑定的事件监听的事件名一致
          * 数据: 会自动传递给回调函数

## 6. 内存结构图(原型结构图)
    function Foo () {}
    const fn1 = new Foo()
    const fn2 = new Foo()
    const o1 = {}
    const o2 = new Object()