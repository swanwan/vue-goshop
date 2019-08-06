<template>
  <div class="search_page">
    <HeadTop>
      <div class="headerLeft" slot="left" @click="$router.back(-1)">
          <i class="iconfont icon-icon-test"></i>
        </div>
        <div class="headerRight" slot="right">
        </div>
    </HeadTop>
    <div class="search_input">
      <at-input v-model="inputSaerch" size="large" placeholder="请输入商家名称" class="search-input"></at-input>
      <at-button type="info" class="search-but" size="large">提交</at-button>
    </div>
  </div>
</template>
<script>
  import HeadTop from '../../components/HeadTop/HeadTop.vue';
  import { Input as AtInput, Button as AtButton} from 'at-ui';
  export default {
    components: { HeadTop, AtInput, AtButton},
    data(){
      return {
        inputSaerch:''
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
      // flex: 2;
      justify-content: space-between;
      input {
        width: 75vw;
        height: 40px;
      }
      .search-but {
        width: 15vw;
      }
    }
  }
</style>