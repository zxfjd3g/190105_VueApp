<template>
  <div>
    <mt-button style='width: 100%' type="primary" @click="hint">测试mint-ui</mt-button>
  </div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    methods: {
      hint () {
        Toast('点击按钮');
      }
    },
  }
</script>
<style>
  
</style>
