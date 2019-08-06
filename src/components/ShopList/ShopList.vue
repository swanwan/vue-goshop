<template>
  <div class="shopList">
    <ul class="shopList_wrapper" v-if="true">
      <p class="view_shop">
        <i class="iconfont icon-liulan"></i>
        <span>浏览商家</span>
      </p>
      <li class="shop_content" v-for="item in 6" :key="item" @click="$router.push('/shop')">
        <div class="shop_left">
          <div class="shop_img">
             <img :src="`./static/images/food/photo` + Math.ceil(Math.random()*20) +`.jpg`" alt="">
          </div>
          <div class="shop_text">
            <span class="shop_title">同福客栈</span>
            <div class="shop_star">
                <span v-for="index in Math.ceil(Math.random()*5)">
                  <i class="iconfont icon-xingji"></i>
                </span>
                <span class="shop_sale">月销售{{Math.ceil(Math.random()*88)}}单</span>
            </div>
            <div class="shop_convey">
              <span>￥20起送</span>
              <span>配送费￥99</span>
            </div>
          </div>
        </div>
        <div class="shop_right">
          <div class="shop_right_text">
            <span class="shop_right_chu">处</span>
            <span class="shop_right_chu">处</span>
            <span class="shop_right_chu">吻</span>
          </div>
          <span class="shop_time">盗圣专送</span>
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
          width: 60%;
          display: flex;
          .shop_img {
            width: 45%;
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
              color:#f90;
              .shop_sale {
                font-size: 11px;
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
