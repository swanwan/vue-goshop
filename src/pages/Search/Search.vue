<template>
  <div class="search_page">
    <HeadTop>
      <div class="headerLeft" slot="left" @click="$router.back(-1)">
          <i class="iconfont icon-icon-test"></i>
        </div>
        <div class="headerRight" slot="right">
        </div>
    </HeadTop>
    <form class="search_input" @submit.prevent="search">
      <at-input v-model="keyword" size="large" placeholder="请输入商家名称" class="search-input" icon="icon icon-x">
      </at-input>
      <input class="search-but" type="submit"></input>
    </form>
    <section class="search-result" v-if="!noSearchShops">
      <ul class="search-container">
        <router-link tag="li" :to="{path:'/shop',query:{id:item.id}}" v-for="item in searchShops" :key="item.id" class="list_li">
          <div class="li-left">
             <img :src="imgBaseUrl + item.image_path" class="restaurant_img">
          </div>
          <section class="li-right">
            <div class="item_right_text">
              <div>
                <span>{{item.name}}</span>
              </div>
              <p>月售 {{item.month_sales||item.recent_order_num}} 单</p>
              <span>{{item.delivery_fee||item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</span>
            </div>
          </section>
        </router-link>
      </ul>
    </section>
    <div class="search-no-result" v-else>很抱歉！无搜索结果</div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import HeadTop from '../../components/HeadTop/HeadTop.vue';
  import { Input as AtInput } from 'at-ui';
  export default {
    components: { HeadTop, AtInput },
    data(){
      return {
        keyword:'',
        imgBaseUrl: 'http://cangdu.org:8001/img/',
        noSearchShops: false
      }
    },
    computed: {
      ...mapState(['searchShops'])
    },
    methods: {
      search() {
        const keyword = this.keyword.trim()
        console.log(keyword)
        if(keyword) {
          this.$store.dispatch('searchShops', keyword)
        }
      }
    },
    watch: {
      searchShops (value) {
        if(!value.length) { // 没有数据
          this.noSearchShops = true
        } else {// 有数据
          this.noSearchShops = false
        }
      }
    }

  }
</script>
<style lang="scss">
  .search_page {
    width: 100%;
    .headerLeft {
      padding: 6px 8px 6px 0px;
      i {
          font-size: 26px;
      }
    }
    .search_input {
      margin-top: 3.2rem;
      padding: 2vh 3vw;
      display: flex;
      justify-content: space-between;
      input {
        width: 75vw;
        height: 40px;
      }
      .search-but {
        width: 15vw;
        border-radius: 5px;
        color: #fff;
        background-color: #eb7070;
      }
    }
    .search-result {
      .search-container {
        .list_li {
          display: flex;
          padding: 10px 20px;
          .li-left{
            flex: 0 0 50px;
            border: 1px solid #f6f6f6;
            margin-right: 20px;
            img {
              width: 50x;
              height: 50px;
              display: inline-block;
            }
          }
          .li-right{
            flex: 1;
            div, p , span {
              font-size: 12px;
            }
          }
        }
      }
    }
    .search-no-result {
      text-align: center;
    }
  }
</style>