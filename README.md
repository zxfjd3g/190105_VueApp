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