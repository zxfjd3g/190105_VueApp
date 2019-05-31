<template>
  <ul class="todo-main">
    <Item v-for="(todo, index) in todos" :key="todo.id" :todo="todo"
          :index="index"/>
  </ul>
</template>
<script>

  export default {
    // 声明接收属性: 属性名
    // 接收的所有标签属性都会成功组件对象的属性
    props: ['todos'],
  }
</script>
<style scoped>
  .todo-main {
    margin-left: 0px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding: 0px;
  }

  .todo-empty {
    height: 40px;
    line-height: 40px;
    border: 1px solid #ddd;
    border-radius: 2px;
    padding-left: 5px;
    margin-top: 10px;
  }
</style>