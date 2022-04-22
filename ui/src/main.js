// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 CSS

// 使用iview组件，好看的按钮那些
Vue.use(iView)

// 路由请求开始之前执行
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  next()
})

// 路由请求开始之后执行
router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
})

// Axios是一个基于promise的HTTP库，可以用在浏览器和node.js中，主要的作用是用于向后台发起请求
import axios from 'axios'

// 对axios请求进行二次封装
var axio = axios.create({
  baseURL: 'http://localhost:9000'
})

// 响应拦截（在响应之后对数据进行一些处理）
// axios.interceptors.request.use(function(config){}) 请求拦截
axio.interceptors.response.use(resp => {
  if (resp.data.code === 200) {
    return resp.data.data
  } else {
    // 返回一个用reason拒绝的Promise
    return Promise.reject(resp.data)
  }
}, error => {
  return Promise.reject(error)
})

// 全局挂载axio，使用别名$http
Vue.prototype.$http = axio
// 可以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
