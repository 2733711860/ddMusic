import Vue from 'vue'
import App from './App'
import router from './router'
import http from '@/api/http'
import apis from '@/api'
import config from '@/config'
import store from './store' // 引入状态管理文件
import 'lib-flexible/flexible' // 移动端适配插件

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

import storage from '@/assets/js/storage.js'
window.cache = storage

import '@/assets/css/common.css'

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')
