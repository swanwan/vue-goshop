<template>
  <div class="foodGuide">
    <ul class="list">
      <li @click="goRouter('/miste')" :class="{on: '/miste'===$route.path}">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </li>
      <li @click="goRouter('/search')" :class="{on: '/search'===$route.path}">
        <i class="iconfont icon-chazhao"></i>
        <span>查找</span>
      </li>
      <li @click="goRouter('/order')" :class="{on: '/order'===$route.path}">
        <i class="iconfont icon-wendang"></i>
        <span>订单</span>
      </li>
      <li @click="goRouter('/profile')" :class="{on: '/profile'===$route.path}">
        <i class="iconfont icon-wode"></i>
        <span>我的</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    methods: {
      goRouter (path) {
        this.$router.push(path)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .foodGuide{
    width: 100%;
    position:absolute;
    z-index: 100;
    left: 0px;
    bottom: 0px;
    padding: 0.8rem;
    box-sizing: border-box;
    border-top: 1px solid #e4e4e4;
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    .list {
      display: flex;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 25%;
        color:#999999;
        &.on {
          color: #6699CC;
        }
        i {
          font-size: 1.5rem;
          height: 2.2rem;
          line-height: 2rem;
        }
      }
    }
  }
</style>