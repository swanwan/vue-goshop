<template>
  <div>
    <div class="shop-car">
      <div class="shop-content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highLight:totalCount}">
              <i class="iconfont icon-shopcar" :class="{highLight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="logo-text">
            <span class="price" :class="{highLight:totalCount}">￥{{totalPrice}}</span>
            <p class="desc">另需配送费￥{{info.deliveryPrice}}元</p>
          </div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">{{payText}}</div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcar-list" v-show="listShow">
          <div class="shopcar-header">
            <h3 class="car">购物车</h3>
            <span class="clear" @click="clearCart">清空</span>
          </div>
          <div class="shopcar-ul">
            <ul>
              <li class="shopcar-li" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="shopcar-cover" v-show="listShow" @click="toggleShow"></div>
    </transition>
  </div>
</template>
<script>
  import CartControl from '../CartControl/CartControl.vue'
  import { mapState, mapGetters } from 'vuex'
  import { MessageBox } from 'mint-ui'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        isShow: false
      }
    },
    components: {
      CartControl
    },
    computed: {
      ...mapState(['cartFoods', 'info']),
      ...mapGetters(['totalCount','totalPrice']),
      payText() {
        const {totalPrice} = this
        const {minPrice} = this.info
        if(totalPrice === 0) {
          return `￥${minPrice}元起送`
        }else if(totalPrice < minPrice) {
          return `还差￥${minPrice - totalPrice}元起送`
        } else {
          return '结算'
        }
      },
      payClass() {
        const {totalPrice} = this
        const {minPrice} =this.info
        return minPrice <= totalPrice? 'enough':'not-enough'
      },
      listShow () {
        // 如果总数量为0, 直接不显示
        if(this.totalCount===0) {
          this.isShow = false
          return false
        }
        if(this.isShow) {
          this.$nextTick(() => {
            // 实现BScroll的实例是一个单例
            if(!this.scroll) {
              this.scroll = new BScroll('.shopcar-ul', {
                click: true
              })
            } else {
              this.scroll.refresh() // 让滚动条刷新一下: 重新统计内容的高度
            }
          })
        }
        return this.isShow
      }
    },
    methods: {
      toggleShow() {
        //总数量大于0时候
        if(this.totalCount > 0) {
          this.isShow = !this.isShow
        }
      },
      clearCart () {
        MessageBox.confirm('确定清空购物车么？').then(
          action => {this.$store.dispatch('clearCart') },() => {})
      }
    },
    mounted () {
    }
  }
</script>
<style lang="scss">
  .shop-car {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    background-color: #fff;
    .shop-content {
      display: flex;
      color: rgba(255, 255, 255, 0.4);
      background-color: #141d27;
      .content-left{
        flex:1;
        color: #fff;
        display: flex;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highLight {
              background: #02a774;
            }
            i {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
               &.highLight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 24px;
            height: 16px;
            text-align: center;
            border-radius: 16px;
            font-weight: 700;
            font-size: 9px;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .logo-text {
          .price {
            font-size: 18px;
            font-weight: 600;
            &.highLight {
              color: #fff;
            }
          }
          .desc {
            font-size: 10px;
          }
        }
      }
      .content-right{
        flex: 0 0 100px;
        .pay {
          text-align: center;
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          background: #2b333b;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .shopcar-list {
      position: absolute;
      left: 0px;
      top: 0px;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);
      background-color: #fff;
      &.move-enter-active, &.move-leave-active {
        transition: transform .3s;
      }
      &.move-enter,&.move-leave-to {
        transform: translateY(0);
      }
      .shopcar-header{
        width: 100%;
        background-color: #f3f5f7;
        display: flex;
        padding: 0.6rem;
        justify-content: space-between;
        border-bottom: 1px solid #dcdfe2;
        .car {
          color: black;
          font-size: 16px;
        }
        .clear {
          color: #02a774;
          font-weight: 600;
        }
      }
      .shopcar-ul{
        max-height: 200px;
        overflow: hidden;
        background: #fff;
        .shopcar-li {
          padding: 14px 6px;
          position: relative;
          border-bottom: 1px solid #f3f4f4;
          .name{
            color: black;
          }
          .price{
            position: absolute;
            right: 100px;
            bottom: 14px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }
          .cartcontrol-wrapper{
            position: absolute;
            right: 0px;
            bottom: 10px;
          }
        }
      }
    }
  }
  .shopcar-cover {
    position: fixed;;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active{
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-to{
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>