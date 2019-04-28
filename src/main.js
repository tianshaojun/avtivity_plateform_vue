// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/utils/common.css'
import '@/assets/css/icons.css';
import '@/utils/tn_code/style.css';

import App from './App'
import router from './router'
import store from './store'
import '@/permission.js'



// 引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import axios from 'axios'
Vue.prototype.$axios =axios
window.axios = axios

// 全局配置
// axios.defaults.baseURL = 'http://test-twobox.molixyou.com/';   //测试的
// axios.defaults.baseURL = 'http://admin-hd.vdongchina.com/';   //正式的
axios.defaults.baseURL = process.env.BASEURL;

let sets =JSON.parse(localStorage.getItem("session"))
if(sets){
  store.commit('SET_USER',sets)
}


Vue.use(ElementUI)
// Vue.prototype.$api = api
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


