<template>
  <transition name='fade'>
    <div class="food-cart" v-if="isShow">
      <div class="food-content">
        <div class="food-pic">
          <img v-lazy="food.image">
          <p class="food-p-desc">{{food.info}}</p>
        </div>
        <div class="food-title">
          <div class="food-info">
            <h3>{{food.name}}</h3>
            <div class="food-dec">
              <span class="food-sale">月售{{food.sellCount}}份数</span>
              <span class="food-rating">{{food.rating}}%好评率</span>
            </div>
          </div>

          <div class="price-cart">
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <CartControl :food="food"/>
            </div>
          </div>
        </div>
        <div class="go-back" @click="toggleShow">
          <i class="iconfont icon-icon-test"></i>
        </div>
      </div>
      <div class="food-cover" @click="toggleShow"></div>
    </div>
  </transition>
</template>
<script>
  import CartControl from '../CartControl/CartControl.vue'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    props :{
      food: Object
    },
    components: {
      CartControl
    },
    methods: {
      toggleShow() {
        this.isShow = !this.isShow
      }
    }
  }
</script>
<style lang="scss">
  .food-cart {
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 48px;
    z-index: 101;
    width: 100%;
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity 0.4s;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
    }
    .food-content {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 80%;
      z-index: 66;
      background: #fff;
      border-radius: 5px;
      .food-pic{
        position: relative;
        width: 100%;
        height: 0px;
        padding-top:100%;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .food-p-desc {
          position: absolute;
          bottom:5px;
          left: 7px;
          color: #fff;
          font-size: 10px;
        }
      }
      .food-title{
        width: 100%;
        padding: 10px;
        .food-info {
          display: flex;
          justify-content: space-between;
          h3 { font-weight: 600}
          .food-dec{
            font-size: 12px;
            color: #93999f;
            margin: 0.4rem 0px;
          }
        }
        .price-cart {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price{
            color: red;
            font-size: 17px;
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper{}
        }
      }
      .go-back {
        position: absolute;
        top: 0px;
        left: 0px;
        color: #fff;
        i {
          font-size: 32px;
        }
      }
    }
    .food-cover {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      bottom: -48px;
      z-index: 55;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
</style>