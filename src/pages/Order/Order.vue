<template>
  <div class="order_pages">
    <HeadTop>
      <div class="headerLeft" slot="left">
        </div>
        <div class="headerRight" slot="right">
        </div>
    </HeadTop>
    <section class="order_wrapper">
      <div class="order_img">
        <img src="./images/person.png" alt="">
      </div>
      <h3>登录查看外卖订单</h3>
      <at-button type="primary" size="large">登录</at-button>
    </section>
  </div>
</template>
<script>
  import HeadTop from '../../components/HeadTop/HeadTop.vue';
  import { Input as AtInput, Button as AtButton} from 'at-ui';
  export default {
    components: { HeadTop, AtButton},
    data(){
      return {
      }
    }
  }
</script>
<style lang="scss">
  .order_pages {
    width: 100vw;
    .order_wrapper {
      padding-top: 3.2rem;
      text-align: center;
      width: 60vw;
      margin: 0 auto;
      .order_img {
        margin-top: 100px;
        img {
          display: block;
          width: 100%;
          height: 30%;
        }
      }
      h3 {
        padding:10px 0;
        font-size:17px;
        color:#6a6a6a;
      }
    }
  }
</style>