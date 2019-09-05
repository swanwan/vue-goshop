<template>
  <div class="shop_page">
    <ShopHeader></ShopHeader>
    <section class="content">
      <ul class="tab">
        <li class="tab-item">
          <router-link to="/shop/goods" replace>商品</router-link>
        </li>
        <li class="tab-item">
           <router-link to="/shop/ratings" replace>评价</router-link>
         </li>
        <li class="tab-item">
          <router-link to="/shop/info" replace>商家</router-link>
        </li>
      </ul>
    </section>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
  import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
  export default {
    components: {
      ShopHeader
    }
  }
</script>
<style lang="scss">
  .shop_page {
    .content {
      .tab {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #f3f5f7;
        .tab-item {
          a {
            color: #a2acad;
            display: block;
            position: relative;
            padding: 0.6rem 0px;
            &.router-link-active {
              color: #f7be16;
              &::after {
                content:'';
                position:absolute;
                left:50%;
                bottom:1px;
                width: 35px;
                height :2.5px;
                transform :translateX(-50%);
                background: #f7be16;
              }
            }
          }
        }
      }
    }
  }
</style>