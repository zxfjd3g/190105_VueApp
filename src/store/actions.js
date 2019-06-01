/*
包含n个用于间接更新状态数据的方法的对象
*/
import axios from 'axios'
import {
  REQUESTING,
  REQ_SUCCESS,
  REQ_ERROR
} from "./mutation-types"

export default {

  /*
  搜索的异步action
  */
  async search ({commit}, searchName) {
    // 更新状态数据(请求中)
    commit(REQUESTING)
    try {
      // 发送异步ajax请求获取users
      const response = await axios.get('https://api.github.com/search/users', {
        params: {
          q: searchName
        } // 指定query请求参数
      })
      debugger
      // 成功了, 更新数据(成功)
      const users = response.data.items.map(item => ({
        name: item.login,
        url: item.html_url,
        avatar_url: item.avatar_url
      }))
      commit(REQ_SUCCESS, users)
    } catch (error) {
      // 失败了, 更新数据(失败)
      commit(REQ_ERROR, '请求出错: ' + error.message)
    }
  }
}
