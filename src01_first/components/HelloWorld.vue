<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>
<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: '第一个Vue组件'
      }
    }
  }
</script>
<style scoped>
  h1 {
    color: red;
  }
</style>