export default {
  /*
  保存todos
   */
  saveTodos (todos) {
    localStorage.setItem('todos_key', JSON.stringify(todos))
  },

  /*
  读取todos
   */
  getTodos () {
    return JSON.parse(localStorage.getItem('todos_key') || '[]')
  }


}