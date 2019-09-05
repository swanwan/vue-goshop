<template>
  <div class="shop_header">
    <nav class="shop_nav" :style="{backgroundImage: `url(${info.bgImg})`}">
      <p class="nav_back" @click="$router.back()">
        <i class="iconfont icon-icon-test"></i>
      </p>
    </nav>
    <section class="shop_content">
      <div class="shop_img">
        <img :src="info.avatar" alt="">
      </div>
      <div class="content">
        <div class="frist-line" @click="showBand">
          <span class="band">品牌</span>
          <h2 class="title ellipsis">{{info.name}}</h2>
          <i class="iconfont icon-arrow1"></i>
        </div>
        <div class="second-line">
          <span class="shop-ratings">{{info.score}}</span>
          <span class="shop-sales">月售{{info.sellCount}}单</span>
          <span class="shop-delivery">{{info.description}}</span>
          <span class="shop-time">约{{info.deliveryTime}}分钟</span>
          <span class="distance">距离{{info.distance}}</span>
        </div>
        <div class="third-line" v-if="info.supports" @click="showSales">
          <div class="third-left">
            <span class="first-order">{{info.supports[0].name}}</span>
            <span class="supports-name ellipsis">{{info.supports[0].content}}</span>
          </div>
          <div class="third-right">
            <span class="ellipsis">{{info.supports.length}}个优惠</span>
            <i class="iconfont icon-arrowdown-copy"></i>
          </div>
        </div>
      </div>
    </section>
    <div class="shop_card">
      <transition name="fade">
        <div class="shop_card_band" v-show="band">
          <at-card :body-style="{ padding: 0 }">
              <div class="card_band_content">
                <div class="first-band">
                  <div class="mini-tag">品牌</div>
                  <h3 class="band-title">{{info.name}}</h3>
                </div>
                <section class="second-information">
                  <tr class="info-title">
                    <th>{{info.score}}</th>
                    <th>{{info.sellCount}}</th>
                    <th>{{info.description}}</th>
                    <th>{{info.deliveryPrice}}元</th>
                    <th>{{info.distance}}</th>
                  </tr>
                  <tr class="info-content">
                    <td>评分</td>
                    <td>月售</td>
                    <td>约{{info.deliveryTime}}分钟</td>
                    <td>配送费用</td>
                    <td>距离</td>
                  </tr>
                </section>
                <div class="third-notice">
                  <h3 class="brief-modal-title">
                    <span>公告</span>
                  </h3>
                  <div class="brief-modal-notice">
                    {{info.bulletin}}
                  </div>
                </div>
                <div class="mask-footer" @click="showBand">
                  <i class="iconfont icon-Close1"></i>
                </div>
              </div>
          </at-card>
          <div class="shop_card_cover"></div>
        </div>
      </transition>
      <transition name="fade">
        <div class="shop_card_sales" v-show="sales">
          <at-card :body-style="{ padding: 0 }" class="card_sales_content">
            <h4 slot="title" class="sales-title">优惠活动</h4>
            <div slot="extra" class="sales-closed" @click="showSales">
              <i class="iconfont icon-close1"></i>
            </div>
            <ul class="sales-list">
              <li class="activity-item" v-for="(support, index) in info.supports"
                :key="index" :class="supportClasses[support.type]">
                  <span class="content-tag">{{support.name}}</span>
                  <span class="content-title">{{support.content}}</span>
                </li>
            </ul>
          </at-card>
          <div class="shop_card_cover"></div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import { Card as AtCard} from 'at-ui'
  export default {
    data() {
      return {
        supportClasses: ['activity-green', 'activity-red', 'activity-orange'],
        band: false,
        sales: false
      }
    },
    components: {
      AtCard
    },
    computed: {
      ...mapState(['info'])
    },
    methods: {
      showBand() {
        this.band=!this.band
      },
      showSales() {
        this.sales=!this.sales
      }
    },
    mounted(){
      this.$store.dispatch('getShopInfo')
    }
  }
</script>
<style lang="scss">
  .shop_header {
    height: 100%;
    position: relative;
    background: #fff;
    color: #fff;
    overflow: hidden;
    .shop_nav {
      width: 100vw;
      height: 50px;
      background-size: cover;
      background-repeat: no-repeat;
      position: relative;
      &:before {
        content:'';
        position: absolute;
        top:0;
        left: 0;
        bottom: 0;
        right: 0;
        background-color: rgba(119, 103, 137, .43);
      }
      .nav_back {
        position: relative;
        z-index: 20;
        color: white;
        i {
          font-size: 2rem;
        }
      }
    }
    .shop_content {
      position: relative;
      .shop_img {
        position: absolute;
        top: -35px;
        left: 50%;
        margin-left: -35px;
        img {
          box-shadow: 0 0 0.4vw 0 rgba(0, 0, 0, .2);
          display: block;
          width: 65px;
          height: 65px;
          border-radius: 2px;
        }
      }
      .content {
        padding: 35px 20px 0px;
        margin: 0px auto;
        width:90vw;
        .frist-line {
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          flex: 1;
          .band {
            min-width: 32px;
            font-weight: 600;
            background-color: gold;
            font-size: 12px;
            line-height: 12px;
            height:18px;
            padding: 4px;
            margin-right: 10px;
            transform: scale(1);
            transform-origin:0 0;
            display:flex;
            align-items: center;
            justify-content:center;
          }
          i {
            margin-left: 10px;
            font-size: 28px;
            color: #545454;
          }
          h2 {
            font-size: 23px;
            font-weight: 600;
          }
        }
        .second-line {
          font-size: 11px;
          margin: 0px 0px 5px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          color: black;
        }
        .third-line {
          display: flex;
          justify-content: space-between;
          overflow: hidden;
          white-space: nowrap;
          align-items: baseline;
          font-size: 11px;
          line-height: 13px;
          padding: 5px 7px;
          border: 1px solid #eeeeee;
          color: #666666;
          .third-left {
            flex: 1;
            overflow: hidden;
            .first-order {
              width: 25px;
              background-color: #70bc46;
              color:white;
              font-size: 10px;
              padding: 2px 1px 1px;
              border-radius: 2px;
            }
            .supports-name {
              text-align:left;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
          .third-right {
            width: 50px;
            flex-shrink: 0;
          }
        }
      }
    }
    .shop_card {
      .shop_card_band {
        position: fixed;
        top :0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index:21;
        .card_band_content {
          width: 80vw;
          border-radius: 8px;
          padding: 5vh 5vw;
          position: fixed;
          z-index:100;
          background-color: white;
          top: 30%;
          left: 50%;
          transform:translateX(-50%);
          .first-band {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            .mini-tag {
              background-color: gold;
              font-size: 13px;
              line-height: 18px;
              height: 18px;
              padding: 0 4px;
              margin-right: 10px;
            }
            .band-title{
              font-weight: 700;
              font-size: 20px;
            }
          }
          .second-information {
            width: 100%;
            padding: 2vh 0;
            .info-title {
              th {
                width: 15vw;
                color: #2C405A;
                font-weight: 600;
              }
            }
            .info-content {
              td {
                text-align: center;
                color: #a7a7a7;
                font-size: 12px;
              }
            }
          }
          .third-notice {
            .brief-modal-title{
              width: 100px;
              text-align: center;
              margin: 0px auto 10px;
              background-image:linear-gradient(90deg, #fff, #333 50%, #fff);
              background-size: 100% 1px;
              background-position: 50%;
              background-repeat: no-repeat;
               span {
                font-size: 12px;
                padding: 0 6px;
                color: #999;
                background-color: #fff;
               }
            }
            .brief-modal-notice {
              font-size: 13px;
              color: black;
            }
          }
          .mask-footer {
            position: absolute;
            z-index:100;
            bottom: -80px;
            left: 50%;
            transform:translateX(-50%);
            i {
              font-size: 35px;
              color: white;
              color: rgba(255, 255, 255, .7);
            }
          }
        }
        .shop_card_cover {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, .5);
          z-index: 99;
        }
      }
      .shop_card_sales {
        position: fixed;
        top :0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index:21;
        .card_sales_content {
          width: 100vw;
          position: fixed;
          z-index:100;
          background-color: rgba(255, 255, 255, .9);
          bottom: 0%;
          left: 0%;
          height: 268px;
          .sales-title {
            font-weight: 600;
            font-size: 22px;
            color: #333333;
          }
          .sales-closed {
            i {
              font-size: 35px;
              color: #333333;
            }
          }
          .sales-list {
            font-size: 16px;
            height: 180px;
            overflow-y: auto;
            margin: 3vh 5vw;
            .activity-item {
              margin-bottom: 12px;
              display: flex;
              font-size: 13px;
              align-items: center;
              &.activity-green {
                .content-tag {
                  background-color: rgb(112, 188, 70);
                }
              }
              &.activity-red {
                .content-tag{
                  background-color: rgb(240, 115, 115);
                }
              }
              &.activity-orange{
                .content-tag{
                  background-color: rgb(241, 136, 79);
                }
              }
              .content-tag {
                text-align: center;
                display:inline-block;
                border-radius: 2px;
                width: 36px;
                height: 18px;
                margin-right: 10px;
                color: #fff;
                position: relative;
              }
              .content-title {
                  color: black;
              }
            }
          }
        }
        .shop_card_cover {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: rgba(0, 0, 0, .5);
          z-index: 99;
        }
      }
    }
  }
</style>