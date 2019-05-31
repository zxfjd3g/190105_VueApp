<template>
  <div>
    <h2 v-if="firstView">请输入关键字进行搜索</h2>
    <h2 v-else-if="loading">正在搜索中...</h2>
    <h2 v-else-if="errorMsg">{{errorMsg}}</h2>
    <div class="row" v-else>
      <div class="card" v-for="user in users" :key="user.name">
        <a :href="user.url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        firstView: true, // 是否显示初始页面
        loading: false, // 是否正在请求中
        errorMsg: '', // 需要显示错误信息
        users: [], // 搜索到的用户列表
      }
    },

    mounted () {
      // 绑定事件监听
      this.$bus.$on('search', async (searchName) => {
        // 更新数据(请求中)
        this.firstView = false
        this.loading = true
        try {
          // 发送异步ajax请求获取users
          const response = await axios.get('https://api.github.com/search/users2', {
            params: {q: searchName} // 指定query请求参数
          })
          // 成功了, 更新数据(成功)
          const users = response.data.items.map(item => ({
            name: item.login,
            url: item.html_url,
            avatar_url: item.avatar_url
          }))
          this.users = users
          this.loading = false
        } catch (error) {
          // 失败了, 更新数据(失败)
          this.loading = false
          this.errorMsg = error.message
        }
      })
    }
  }
</script>
<style>
  .card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
  }

  .card > img {
    margin-bottom: .75rem;
    border-radius: 100px;
  }

  .card-text {
    font-size: 85%;
  }
</style>
