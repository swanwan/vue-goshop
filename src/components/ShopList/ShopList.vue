<template>
  <div class="shopList">
    <ul class="shopList_wrapper" v-if="shops.length">
      <p class="view_shop">
        <i class="iconfont icon-liulan"></i>
        <span>浏览商家</span>
      </p>
      <li class="shop_content" v-for="(shop, index) in shops" :key="index" @click="$router.push('/shop')">
        <div class="shop_left">
          <div class="shop_img">
             <img :src="baseImgUrl+shop.image_path" alt="">
          </div>
          <div class="shop_text">
            <span class="shop_title">{{shop.name}}</span>
            <div class="shop_star">
                <span class="shop_star_about">
                  <Star :score="shop.rating" :size="24"/>
                </span>
                <span class="shop_rating">{{shop.rating}}</span>
                <span class="shop_sale">月销售{{shop.recent_order_num}}单</span>
            </div>
            <div class="shop_convey">
              <span>￥{{shop.float_minimum_order_amount}}起送</span>
              <span>配送费￥{{shop.float_delivery_fee}}</span>
            </div>
          </div>
        </div>
        <div class="shop_right">
          <div class="shop_right_text">
            <span class="shop_right_chu" v-for="(support, index) in shop.supports" :key="index">{{support.icon_name}}</span>
          </div>
          <span class="shop_time">{{shop.delivery_mode.text}}</span>
        </div>
      </li>
    </ul>
    <ul v-else="false">
      <li v-for="item in 6">
        <img src="./images/shop_back.svg" alt="back">
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapState} from 'vuex';
  import Star from '../Star/Star.vue';
  export default {
    data () {
      return {
        baseImgUrl: '/static/images/food/'
      }
    },
    components: {
      Star
    },
    computed: {
      ...mapState(['shops']),
    },
    mounted () {
    },
    methods:{
    }
  }
</script>
<style lang="scss">
  .shopList {
    width: 100%;
    .shopList_wrapper {
      width: 100%;
      border-top: 2px solid #f1f1f1;
      box-sizing: border-box;
      .view_shop{
        margin: 16px 16px 0px;
        color: #9f9f9f;
      }
      .shop_content {
        display: flex;
        justify-content: space-between;
        padding: 1rem 8px;
        border-bottom: 2px solid #fbfbfb;
        .shop_left {
          width: 65%;
          display: flex;
          .shop_img {
            width: 30%;
            height: 80px;
            max-width: 160px;
            max-height: 90px;
            min-height:60px;
            border: 3px solid #f1f1f1;
            border-radius: 7px;
            margin-right: 5%;
            img {
              width:100%;
              height: 100%;
              border-radius: 7px;
              display: inline-block;
            }
          }
          .shop_text {
            display: flex;
            flex-direction: column;
            justify-content:space-around;
            .shop_title {
              width: 100%;
              font-weight: 600;
              &::before {
                  content: '品牌';
                  display: inline-block;
                  font-size:12px;
                  line-height :12px;
                  color :#333;
                  background-color: #ffd930;
                  font-weight: 700;
                  padding :2px 2px;
                  border-radius :2px;
                  margin-right :5px;
                }
            }
            .shop_star {
              width: 100%;
              color:#f90;
              font-size: 11px;
              display: flex;
              align-items: center;
              .shop_rating {
                margin:0 3px;
              }
              .shop_sale {
                // font-size: 11px;
                color:#b2b2b2;
              }
            }
            .shop_convey {
              font-size: 11px;
            }
          }
        }
        .shop_right {
          display: flex;
          flex-direction: column;
          justify-content:space-around;
          font-size: 11px;
          .shop_right_text {
            color: #999;
            .shop_right_chu {
              border: 1px solid #f0f0f0;
              padding: 1px;
            }
          }
          .shop_time{
            color: #69c;
            border: 1px solid #6699cc;
            border-radius: 2px;
          }
        }
      }
    }
  }
</style>
