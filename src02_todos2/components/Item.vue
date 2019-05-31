<template>
  <li :style="{backgroundColor: bgColor}"
      @mouseenter="handleEnter(true)"
      @mouseleave="handleEnter(false)">
    <label>
      <input type="checkbox" v-model="isCompleted"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="deleteItem">删除</button>
  </li>
</template>
<script>
  import PubSub from 'pubsub-js'

  export default {
    // 声明接收标签属性
    props: {
      todo: Object,
      index: Number
    },

    data () {
      return {
        isShow: false, // 标识按钮是否显示, 默认不显示
        bgColor: 'white'
      }
    },

    computed: {
      // 是否勾选
      isCompleted: {
        // 动态确定是否勾选
        get () {
          return this.todo.completed
        },
        // 监视勾选状态的变化
        set (value) { // 勾选状态发生了变化
          console.log('set()', value)
          // this.toggleTodo(this.todo)
          // 通过事件总线分发事件
          this.$bus.$emit('toggleTodo', this.todo)
          console.log('emit()之后')
        }
      }
    },

    methods: {
      handleEnter (isEnter) {
        if (isEnter) {
          this.bgColor = '#cccccc'
          this.isShow = true
        } else {
          this.bgColor = '#ffffff'
          this.isShow = false
        }
      },

      deleteItem () {
        if (confirm('确定删除吗?')) {
          // this.deleteTodo(this.index)
          // 发布消息(deleteTodo)
          PubSub.publish('deleteTodo', this.index)
        }
      }
    }
  }
</script>
<style scoped>
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>