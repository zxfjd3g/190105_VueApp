/*
包含n个用于直接更新状态数据的方法的对象
*/
import { REQUESTING, REQ_SUCCESS, REQ_ERROR } from "./mutation-types"

export default {

  /*
  更新为请求中
  */
  [REQUESTING] (state) {
    state.firstView = false
    state.loading = true
  },

  [REQ_SUCCESS](state, users) {
    state.loading = false
    state.users = users
  },

  [REQ_ERROR](state, errorMsg) {
    state.loading = false
    state.errorMsg = errorMsg
  },
}
