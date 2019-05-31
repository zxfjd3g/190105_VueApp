<template>
  <div>
    <h2 v-if="!repoUrl">loading...</h2>
    <div v-else>
      most star repo is 
      <a :href="repoUrl">{{repoName}}</a>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        repoUrl: '',
        repoName: ''
      }
    },
    
    async mounted() {
      const url = `https://api.github.com/search/repositories?q=v&sort=stars`
      // 使用vue-resource发异步ajax请求获取数据
      /* this.$http.get(url).then(response => { // 成功回调
        // 从响应中取出数据
        const result = response.data
        const {name, html_url} = result.items[0]

        // 更新数据
        this.repoUrl = html_url
        this.repoName = name
      }).catch(error => { // 出错失败了
        alert('请求失败了')
      }) */

      // 使用axios发异步ajax请求获取数据
      /* axios.get(url).then(response => { // 成功回调
        
      }).catch(error => { // 出错失败了
        alert('请求失败了2')
      }) */

      try {
        const response = await axios.get(url)
        // 从响应中取出数据
        const result = response.data
        const {name, html_url} = result.items[0]

        // 更新数据
        this.repoUrl = html_url
        this.repoName = name
      } catch (error) { // 出错失败了
        alert('请求失败了2')
      }
    },
  }
</script>
<style>
  
</style>
