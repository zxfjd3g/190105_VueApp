<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addTodo="addTodo"/>
      <todo-list :todos="todos" :deleteTodo="deleteTodo" :toggleTodo="toggleTodo"/>
      <Footer :todos="todos" :checkAllTodos="checkAllTodos"/>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  import storageUtils from "./utils/storageUtils";
  export default {

    data () {
      return {
        todos: storageUtils.getTodos()
      }
    },

    methods: {
      // 添加todo
      addTodo (todo) {
        this.todos.unshift(todo)
      },

      // 删除指定todo
      deleteTodo (index) {
        this.todos.splice(index, 1)
      },

      // 切换指定todo的是否完成的属性值
      toggleTodo (todo) {
        todo.completed = !todo.completed
      },

      // 对所有todo进行全选/全不选
      checkAllTodos (isCheck) {
        this.todos.forEach(todo => todo.completed = isCheck)
      }
    },

    watch: {
      todos: {
        deep: true, // 深度监视
        /*handler (val) {  // todos发生变化
          // 将最新的todos保存到local
          storageUtils.saveTodos(val)
        },*/
        handler: storageUtils.saveTodos
      },
    },


    filters: { // 局部注册过滤器

    },

    directives: { // 局部注册指令

    },

    components: { // 局部注册组件
      Header,
      TodoList: List,
      Footer
    }
  }
</script>
<style scoped>
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
