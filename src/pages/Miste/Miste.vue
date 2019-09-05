<template>
  <div class="miste_page">
      <HeadTop class="miste_head"v :title="address.name">
        <div class="headerLeft" slot="left">
           <router-link class="header_search" to="/search">
            <i class="iconfont icon-chazhao"></i>
           </router-link>
        </div>
        <div class="headerRight" slot="right">
           <router-link class="header_login" :to="userInfo._id ? '/profile': '/login'">
              <span class="header_login_text" v-if="!userInfo._id">
                登录
              </span>
              <span class="header_login_text" v-else>
                 <i class="iconfont icon-xinxi"></i>
              </span>
           </router-link>
        </div>
      </HeadTop>
      <div class="miste_content">
        <div class="miste_swiper">
          <swiper :options="swiperOption" ref="mySwiper">
            <!-- slides -->
            <swiper-slide><img src="../../../static/images/swiper/photo-1.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="../../../static/images/swiper/photo-2.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="../../../static/images/swiper/photo-3.jpg" alt=""></swiper-slide>
            <swiper-slide><img src="../../../static/images/swiper/photo-4.jpg" alt=""></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="miste_shop_list">
            <ShopList></ShopList>
        </div>
      </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import HeadTop from '../../components/HeadTop/HeadTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    name: 'carrousel',
    components: { HeadTop, swiper, swiperSlide, ShopList },
    data(){
      return{
        swiperOption: {
          // 所有的参数同 swiper 官方 api 参数
          loop:true,
          effect : 'coverflow',
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
          }
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      ...mapState(['address', 'categorys', 'userInfo']),
    },
    mounted() {
       this.swiper.slideTo(3, 1000, false)
       this.$store.dispatch('getShops')
    }
  }
</script>
<style lang="scss">
@import 'swiper/dist/css/swiper.css';
  .miste_page {
    width: 100%;
    .miste_head {
        i {
          font-size: 1.2rem;
          padding-right:5px;
          color:#7e8c8d;
        }
        .headerRight {
          a {
            color:#2c3e50;
            font-size: 13px;
          }
        }
    }
    .miste_content {
      .miste_swiper {
        padding-top: 3.2rem;
        .swiper-container {
          width: 100%;
          height: 220px;
          img {
            display: inline-block;
            width: 100%;
            height: 100%;
          }
          .swiper-pagination-bullet-active {
            background-color: #69c;
          }
        }
      }
    }
  }
</style>
