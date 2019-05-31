## 1. vue脚手架

	用来创建vue项目的工具包
	创建项目:
	    npm install -g vue-cli
	    vue init webpack VueDemo
	开发环境运行:
	    cd VueDemo
	    npm install
	    npm run dev
	生产环境打包发布
	    npm run build
	    npm install -g serve
	    serve dist
	    http://localhost:5000


## 2. eslint
    用来做项目编码规范检查的工具
    基本原理: 定义了很多规则, 检查项目的代码一旦发现违背了某个规则就输出相应的提示信息
    有相应的配置, 可定制检查

## 3. 组件化编程
    vue文件包含3个部分
        <template>
          <div></div>
        </template>
        <script>
            export default {
    		 props: []/{}
              data(){},
    		 computed: {}
              methods: {},

    		  watch: {}
    		  filters: {}
    		  directives: {}
    		  components: {}
            }
        </script>
        <style>
        </style>
    组件化编码的基本流程
    	1). 拆分界面, 抽取组件
    	2). 编写静态组件
    	3). 编写动态组件
        	初始化数据, 动态显示初始化界面
        	实现与用户交互功能

## 4. 组件间通信
    1). 组件通信的5种方式
		props
		vue的自定义事件
		全局事件总线
		slot
		vuex(后面单独讲)
    2). props:
        父子组件间通信的基本方式
        属性值的2大类型:
            一般/非函数: 父组件-->子组件
            函数: 子组件-->父组件
    	隔层组件间传递: 必须逐层传递(麻烦)
    	兄弟组件间: 必须借助父组件(麻烦)
    2). vue自定义事件
        给子组件标签绑定事件监听
		子组件向父组件的通信方式
		功能类似于function props
		不适合隔层组件和兄弟组件间的通信
    3). 全局事件总线
		利用vm对象的$on()/$emit()/$off()
		利用vm对象是组件对象的原型对象
		创建vm对象作为全局事件总线对象保存到Vue的原型对象上, 所有的组件对象都可以直接可见:
			Vue.prototype.$bus = new Vue()
        任意组件A可以通过this.$bus.$on()绑定监听接收数据
		任意组件B可以通过this.$bus.$emit()分发事件, 传递数据
    4). slot
        父组件向子组件通信
        通信是带数据的标签
        注意: 标签是在父组件中解析
    5). vuex
        多组件共享状态(数据的管理)
        组件间的关系也没有限制
        功能比事件总线强大, 更适用于vue项目

## 5. 自定义全局事件总线: mini-event-bus
	1). EventBus: 事件总线是一个对象, 是组件间进行通信的共用桥梁, 它包含了用于通信的方法
	2). EventBus的方法
		on(eventName, listener): 绑定事件监听---保存监听回调
		emit(eventName, data): 分发事件---触发所有对应的监听回调调用, 并传入data
		off(eventName): 解绑事件监听---移除对应的所有监听回调
	3). 内部存储listener的数据结构:
		{
			eventName1: [listener1, listener2],
			eventName2: [listener3]
		}

## 6. 自定义消息订阅-发布: mini-pub-sub
	1). PubSub: 一个管理者对象, 是组件间进行通信的共用桥梁, 它包含了用于通信的方法
	2). PubSub的方法
		subscribe(msg, subscriber): 订阅消息---保存订阅者/监听回调, 返回订阅者的唯一标识token
		publish(msg, data): 发布异步消息---触发所有对应的订阅者回调异步调用, 并传入data
		publishSync(msg, data): 发布同步消息---触发所有对应的订阅者回调同步调用, 并传入data
		unsubscribe(flag): 取消订阅---取消所有订阅/某个消息订阅/某些消息订阅
	3). 内部存储subscriber的数据结构:
		{
			msg1: {
				token1: subscriber1,
				token2: subscriber2
			},
			msg2: {
				token3: subscriber3
			}
		}
