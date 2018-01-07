// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import fastClick from 'fastclick'
// 引入依赖
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import 'common/stylus/index.styl'
//fastclick 用法
fastClick.attach(document.body)
Vue.config.productionTip = false
//axios 注册
Vue.prototype.$http = Axios;
/* eslint-disable no-new */
Vue.use(VueLazyLoad,{
  loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
