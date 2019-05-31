/* 
所有路由的配置
*/

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'

export default [{
    path: '/about',
    component: About
  },
  {
    path: '/home',
    component: Home
  },

  { // 自动重定向路由
    path: '/',
    redirect: '/about'
  }
]