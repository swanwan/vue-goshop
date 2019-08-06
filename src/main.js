// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

//轮播图
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css' // require styles
Vue.use(VueAwesomeSwiper, /* { default global options } */)

//at UI
import AtComponents from 'at-ui'
import 'at-ui-style'    // 引入组件样式
Vue.use(AtComponents)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
