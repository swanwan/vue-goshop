<template>
  <div class="shop-ratings" ref="ratings">
    <div class="shop-ratings-content">
      <div class="ratings-header">
        <div class="header-left">
          <h3 class="score">{{info.score}}</h3>
          <p class="title">综合评分</p>
          <p class="rank">高于周围商家{{info.rankRate}}%</p>
        </div>
        <div class="header-right">
          <div class="star-wrapper">
            <Star :score="info.serviceScore" class="star"/>
            <span class="title">服务态度</span>
            <span class="score">{{info.serviceScore}}</span>
          </div>
          <div class="star-wrapper">
            <Star :score="info.foodScore" class="star"/>
            <span class="title">商品评分</span>
            <span class="score">{{info.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="de-time">{{info.deliveryTime}}分钟</span>
          </div>

        </div>
      </div>
      <section class="split"></section>
      <div class="ratings-wrapper">
        <div class="ratings-select">
          <div class="choose-button">
            <span class="button select-all" :class="{choosed:type===2}" @click="setSelectType(2)">
              全部<span class="count">{{ratings.length}}</span>
            </span>
            <span class="button select-satisfy" :class="{choosed:type===0}" @click="setSelectType(0)">
              满意<span class="count">{{positiveSize}}</span>
            </span>
            <span class="button select-not-satisfy" :class="{choosed:type===1}" @click="setSelectType(1)">
              不满意<span class="count">{{ratings.length-positiveSize}}</span>
            </span>
          </div>
          <div class="switch">
            <i class="iconfont icon-right" @click="chooseUseful" :class="{useful: isUseful}"></i>
            <span class="text">只显示有效内容</span>
          </div>

        </div>
        <div class="ratings-content">
          <ul>
            <li class="ratings-item" v-for="(rating, index) in filterRatings" :key="index">
              <div class="avatar">
                <img :src="rating.avatar" alt="" width="28" height='28'>
              </div>
              <div class="item-content">
                <div class="first">
                  <span class="name">{{rating.username}}</span>
                  <div class="star-wrapper">
                    <Star :score="rating.score"/>
                    <span class="delivery">{{rating.deliveryTime}}</span>
                  </div>
                  <div class="time">{{rating.rateTime | date-format}}</div>
                </div>
                <p class="second text">{{rating.text}}</p>
                <ul class="third buyed-goods">
                  <i class="iconfont" :class="rating.rateType===0 ?'icon-dianzan':'icon-dissatisfied'"></i>
                  <li v-for="(recommend, index) in rating.recommend" :key="index" class="food-item">
                    <p>{{recommend}}</p>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import {mapState, mapGetters} from 'vuex'
  import Star from '../../../components/Star/Star.vue'
  export default {
    data() {
      return {
        isUseful: true,
        type: 2 //2全部，0满意， 1不满意
      }
    },
    computed:{
      ...mapState(['info', 'ratings']),
      ...mapGetters(['positiveSize']),
      filterRatings () {
        //先得到相关数据
        const {ratings, type, isUseful} = this
        //返回一个新数组
        return ratings.filter( rating => {
          const {rateType, text} = rating
          return (type===2 || type===rateType) && (!isUseful || text.length>0)
        })
      }
    },
    components: {
      Star
    },
    methods: {
      chooseUseful() {
        this.isUseful = !this.isUseful
      },
      setSelectType(type) {
        this.type = type
      }
    },
    mounted() {
      this.$store.dispatch('getShopRatings', ()=> {
        this.$nextTick(() => {
          let scroll = new BScroll(this.$refs.ratings,{
            scrollY: true,
            click: true
          })
        })
      })
    }
  }
</script>
<style lang="scss">
  .shop-ratings {
    position: absolute;
    top: 216px;
    left: 0px;
    bottom: 0px;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    .ratings-header{
      width: 100%;
      padding: 1rem 0px;
      text-align: center;
      overflow: hidden;
      .header-left{
        width:40%;
        float:left;
        border-right: 2px solid #e6e7e8;
        .score{
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: #f90;
        }
        .title{
          margin-bottom: 8px;
          line-height: 12px;
          font-size: 12px;
          color: #07111b;
        }
        .rank{
          line-height: 10px;
          font-size: 10px;
          color: #93999f;
        }
      }
      .header-right{
        width: 60%;
        float: right;
        .star-wrapper{
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 3px 0px;
          .title {
            margin-left: 14px;
            font-size: 12px;
          }
          .score {
            font-size: 13px;
            margin: 0px 6px;
            color: #f90;
          }
        }
        .delivery-wrapper{
          font-size: 12px;
          .de-time {
            margin-left: 12px;
            font-size: 12px;
            color: #93999f;
          }
        }
      }
    }
    .split{
      height: 1rem;
      width: 100%;
      height: 16px;
      border-top: 1px solid rgba(7,17,27,0.1);
      border-bottom: 1px solid rgba(7,17,27,0.1);
      background: #f3f5f7;
    }
    .ratings-wrapper{
      border-bottom: 1px solid rgba(7,17,27,0.1);
      .ratings-select{
        padding: 15px 12px;
        .choose-button{
          .button {
            display: inline-block;
            text-align: center;
            width: 68px;
            padding: 8px 12px;
            margin-right: 10px;
            font-size: 12px;
            color: #4d555d;
            background: rgba(77,85,93,0.2);
            border-radius: 1px ;
            .count {
              margin-left: 2px;
              font-size: 8px;
            }
            &.choosed {
              color: #fff;
              background-color: #02a774;
            }
          }
        }
        .switch{
          margin: 18px 0 8px;
          color: #93999f;
          .iconfont {
            font-size: 22px;
            &.useful {
              color:#02a774;
            }
          }
          .text {
            font-size: 12px;
            margin-left: 7px;
          }
        }
      }
      .ratings-content{
        .ratings-item {
          display: flex;
          justify-content: space-around;
          padding: 15px 12px;
          border-top: 1px solid #f3f4f4;
          border-bottom: 1px solid #f3f4f4;
          .avatar{
            flex: 0 0 45px;
          }
          .item-content{
            flex: 1;
            .first{
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 12px;
              margin: 5px 0px;
              .star-wrapper {
                display: flex;
                align-items: center;
                span {
                  padding-left: 10px;
                }
              }
            }
            .second{
              font-size: 12px;
              margin: 5px 0px;
            }
            .third{
              display: flex;
              align-items: center;
              font-size: 12px;
              margin: 5px 0px;
              .icon-dianzan {
                color: #f5a100;
              }
              i {
                padding-right: 6px;
                font-size: 14px;
              }
              .food-item {
                p {
                  display: inline-block;
                  padding: 0 6px;
                  border: 1px solid rgba(7,17,27,0.1);
                  border-radius: 1px;
                  color: #93999f;
                  background: #fff;
                  font-size: 10px;
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>