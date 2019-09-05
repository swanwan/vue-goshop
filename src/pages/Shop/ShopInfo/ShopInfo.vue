<template>
  <div class="shop-info">
    <div class="info-content">
      <section class="info">
        <h3 class="section-title">配送信息</h3>
        <div class="delivery">
          <span class="delivery-icon">{{info.description}}</span>
          <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
          <div class="delivery-money">配送费￥{{info.deliveryPrice}}</div>
        </div>
      </section>
      <div class="split"></div>

      <section class="info">
        <h3 class="section-title">活动与服务</h3>
        <ul class="sales-list">
          <li class="activity-item" v-for="(support, index) in info.supports"
                :key="index" :class="supportClasses[support.type]">
            <span class="content-tag">{{support.name}}</span>
              <span class="content-title">{{support.content}}</span>
          </li>
        </ul>
      </section>
      <div class="split"></div>

      <section class="info">
        <h3 class="section-title">商家实景</h3>
        <div class="pic-wrapper">
          <ul class="pic-list" ref="picUl">
            <li class="pic-item" v-for="(item, index) in info.pics">
              <img :src="item" width="120" height="90" alt="">
            </li>
          </ul>
        </div>
      </section>
      <div class="split"></div>

      <section class="info">
        <h3 class="section-title">商家信息</h3>
        <ul class="info-ul">
          <li class="detail-li">
            <span class="bold">品类</span>
            <span>{{info.category}}</span>
          </li>
          <li class="detail-li">
            <span class="bold">商家电话</span>
            <span>{{info.phone}}</span>
          </li>
           <li class="detail-li">
            <span class="bold">地址</span>
            <span>{{info.address}}</span>
          </li>
           <li class="detail-li">
            <span class="bold">营业时间</span>
            <span>{{info.workTime}}</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import BScroll from 'better-scroll'
  export default {
    data() {
      return {
        supportClasses: ['activity-green', 'activity-red', 'activity-orange']
      }
    },
    computed: {
      ...mapState(['info'])
    },
    mounted() {
      //如果没有pics  直接结束
      if(!this.info.pics) {
        return
      }
      //有数据  再建立
      this._initScroll()
    },
    methods: {
      //初始化scroll
      _initScroll () {
        //1.整个shop-info
        new BScroll('.shop-info')
        //计算ul 的长度
        const ul = this.$refs.picUl
        const liWidth = 120
        const space = 6
        const count = this.info.pics.length
        ul.style.width = (liWidth + space) * count -space + 'px'
        new BScroll('.pic-wrapper',{
            scrollX: true//水平滑动
        })
      }
    },
    watch: {
      info () {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    }
  }
</script>
<style lang="scss">
  .shop-info {
    position: absolute;
    top: 215px; //header的长度
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .info-content {
      .info {
        width : 100%;
        position: relative;
        background-color: #fff;
        border-top: 1px solid #dbdee1;
        border-bottom: 1px solid #dbdee1;
        padding: 1rem;
        .section-title {
          font-size: 16px;
          color: black;
          font-weight: 600;
        }
        .delivery {
          margin-top: 8px;
          font-size: 13px;
          color: #666;
          .delivery-icon {
            background-color: #0097ff;
            border-radius:  3px;
            color: white;
            font-size: 10px;
            padding: 2px 4px;
          }
        }
        .sales-list {
          font-size: 16px;
          margin: 3vh 3vw;
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
          }
        }
        .pic-wrapper {
          width: 100%;
          white-space: nowrap;
          margin-top: 16px;
          overflow: hidden;
          .pic-list{
            font-size: 0px;
            .pic-item{
              display: inline-block;
              margin-right: 6px;
              width: 120px;
              height: 90px;
              &.last-child{
                margin: 0px;
              }
            }
          }
        }
        .info-ul {
          .detail-li {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            .bold {
              font-weight: 600;
              font-size: 13px;
            }
          }
        }
      }
      .split {
        width : 100%;
        height: 1rem;
        background-color: #f3f5f7;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
    }
  }
</style>