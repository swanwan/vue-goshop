// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading
})
import loading from './common/imgs/loading.gif'
Vue.config.productionTip = false

import './mock/mockServer' // 加载mockServer即可
import './filter/index' // 加载过滤器

//轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' // require styles
Vue.use(VueAwesomeSwiper, /* { default global options } */)

//at UI
import AtComponents from 'at-ui'
import 'at-ui-style'    // 引入组件样式
Vue.use(AtComponents)

import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
