<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click='search'>Search</button>
    </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        searchName: ''
      }
    },

    methods: {
      search () {
        // 得到searchName
        const searchName = this.searchName.trim()
        if (searchName) {
          // 分发搜索的异步action
          this.$store.dispatch('search', searchName)
        }
      }
    }
  }
</script>
<style>

</style>
