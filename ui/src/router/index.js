import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)

import index from '@/components/index'

import novelSearch from '@/components/novel/search'
import novelIndex from '@/components/novel/index'
import novelRead from '@/components/novel/read'

export default new VueRouter({
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/novel/search/:q',
    name: 'novelSearch',
    component: novelSearch
  }, {
    path: '/novel',
    name: 'novelIndex',
    component: novelIndex
  }, {
    path: '/novel/read',
    name: 'novelRead',
    component: novelRead
  }],
  base: '/static', // 这里解决了项目开打空白，但资源正常加载的问题，static必须在服务端的指定根目录下
  mode: 'history'
})
