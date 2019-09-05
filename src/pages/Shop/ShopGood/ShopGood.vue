<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul class="menu-list">
          <li class="menu-item" v-for="(good, index) in goods" :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">
            <span class="menu-text">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>''
      </div>
      <div class="food-wrapper">
        <ul ref="foodsUl">
          <li class="good-item" v-for="(good, index) in goods" :key="index">
            <h1 class="good-item-title">{{good.name}}</h1>
            <ul>
              <li class="food-item" v-for="(food, index) in good.foods" :key="index" @click="showFood(food)">
                <div class="food-pic">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>
                <div class="food-content">
                  <h3 class="food-title">{{food.name}}</h3>
                  <span class="food-desc">{{food.description}}</span>
                  <div class="food-extra">
                    <span class="sales">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                  </div>
                  <div class="food-bottom">
                    <div class="food-price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="food-cart-wrapper">
                      <CartControl :food="food"/>
                    </div>
                  </div>

                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
  import BScroll from 'better-scroll';
  import {mapState} from 'vuex';
  import Food from '../../../components/Food/Food.vue'
  import CartControl from '../../../components/CartControl/CartControl.vue'
  import ShopCart from '../../../components/ShopCart/ShopCart.vue'
  export default {
    data () {
      return {
        scrollY: '',
        tops: [],
        food: {} // 需要显示的food
      }
    },
    components: {
      CartControl, Food, ShopCart
    },
    mounted() {
      this.$store.dispatch('getShopGoods', () => {
        // 数据更新后执行
        this.$nextTick(() => {
          //执行初始化操作
          this._initScroll()
          this._initTops()
        })
      })
    },
    computed: { //初始化或者相关数据发生变化
      ...mapState(['goods']),
      //计算得到当前分类的下标
      currentIndex() {
        const {tops, scrollY} = this;
        //根据计算结果返回index
        const index = tops.findIndex((top, index) => {
          return scrollY >= top && scrollY < tops[index + 1]
        })
        return index
      }
    },
    methods: {
      //初始化滚动
      _initScroll() {
        //两个滚动栏
        new BScroll('.menu-wrapper', {
          click:true
        })
        this.foodScroll = new BScroll('.food-wrapper', {
            probeType: 2, // 因为惯性滑动不会触发;3时候不需要 scrollend
            click: true
        })
        //给foodScroll 绑定监听事件
        this.foodScroll.on('scroll', ({x, y}) => {
          // console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })
        this.foodScroll.on('scrollEnd', ({x, y}) => {
          // console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },
      //初始化tops
      _initTops() {
        //1.初始化tops, top
        const tops = []
        let top = 0
        tops.push(top)
        //2.收集li
        const Ul = this.$refs.foodsUl.getElementsByClassName('good-item')
        Array.prototype.slice.call(Ul).forEach(li => {
          top +=li.clientHeight
          tops.push(top)
        })
        //3.更新数据
        this.tops = tops
        console.log(this.tops)
      },
      //点击滑动都到目标index
      clickMenuItem(index) {
        // console.log(index)
        const scrollY = this.tops[index]
        this.scrollY = scrollY
        //滑动效果
        this.foodScroll.scrollTo(0, -scrollY, 300)
      },
      //点击食物图片
      showFood(food) {
        // 设置food
        this.food = food
        // 显示food组件 (在父组件中调用子组件对象的方法)
        this.$refs.food.toggleShow()
      }
    }
  }
</script>
<style lang="scss">
  .goods {
    display: flex;
    position: absolute;
    top: 215px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-list{
        width: 100%;
        .menu-item{
          width: 100%;
          height: 54px;
          border-bottom: 1px solid #e8eaec;
          display: table;
          &.current {
            position: relative;
            z-index: 10;
            margin-top: -1px;
            background: #fff;
            color: #02a774;
            font-weight: 700;
          }
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height: 12px;
            margin-right: 2px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
          }
          .menu-text {
            width: 100%;
            display: table-cell;
            vertical-align: middle;
            font-size: 12px;
            text-align: center;
          }
        }
      }
    }
    .food-wrapper{
      flex: 1;
      .good-item {
        .good-item-title {
          color:#93999f;
          background: #f3f5f7;
          border-left: 2px solid #d9dde1;
          font-size: 12px;
          padding-left: 14px;
          height: 26px;
          line-height: 26px;
        }
        .food-item {
          display: flex;
          margin: 18px;
          border-bottom: 1px solid #f3f4f4;
          padding-bottom: 18px;
          .food-pic{
            flex: 0 0 57px;
            margin-right: 10px;
          }
          .food-content{
            width: 100%;
            display: flex;
            flex-direction:column;
            .food-desc, .food-extra{
              font-size: 10px;
              color: #93999f;
              margin: 3px 0px;
              display: flex;
              .sales{
                padding-right: 1rem;
              }
            }
            .food-bottom {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              position: relative;
              .food-price{
                .now {
                  color: red;
                  font-size: 16px;
                }
                .old {
                  text-decoration: line-through;
                  font-size: 10px;
                  color: rgb(147, 153, 159);
                }
              }
              .food-cart-wrapper {
                position: absolute;
                right: 0px;
                top: -3px;
              }
            }
          }
        }
      }
    }
  }
</style>