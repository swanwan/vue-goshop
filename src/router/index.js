import Vue from 'vue'
import Router from 'vue-router'

// import Login from '../pages/Login/Login.vue'
// import Miste from '../pages/Miste/Miste.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGood from '../pages/Shop/ShopGood/ShopGood.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'

const Login = ()=> import('../pages/Login/Login.vue')
const Miste = ()=> import('../pages/Miste/Miste.vue')
const Order = ()=> import('../pages/Order/Order.vue')
const Profile = ()=> import('../pages/Profile/Profile.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/miste'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/miste',
      name: 'Miste',
      component: Miste,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/shop',
      component: Shop,
      children:[
        {
          path: '/shop/goods',
          component: ShopGood,
        },
        {
          path: '/shop/info',
          component: ShopInfo,
        },
        {
          path: '/shop/ratings',
          component: ShopRating,
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
