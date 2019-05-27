<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header/>
      <todo-list :todos="todos"/>
      <Footer/>
    </div>
  </div>
</template>
<script>
  import Header from './components/Header.vue'
  import List from './components/List.vue'
  import Footer from './components/Footer.vue'
  export default {

    data () {
      return {
        todos: [
          {id: 1, title: '吃饭', completed: false},
          {id: 3, title: '睡觉', completed: true},
          {id: 5, title: '打代码', completed: false},
        ]
      }
    },

    components: {
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