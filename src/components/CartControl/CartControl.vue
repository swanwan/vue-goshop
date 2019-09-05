<template>
  <div class="cart">
    <transition name="move">
      <div class="iconfont icon-icon_reduce" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-add2 "  @click.stop="updateFoodCount(true)"></div>
  </div>
</template>
<script>
  export default {
    props: {
      food: Object
    },
    methods: {
      updateFoodCount(isAdd) {
        this.$store.dispatch('updateFoodCount', {isAdd, food:this.food})
      }
    }
  }
</script>
<style lang="scss">
  .cart {
    width: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .iconfont {
      display: inline-block;
      padding:0 10px;
      font-size: 21px;
      color: #f7be16;
      font-weight: 600;
    }
    .icon-icon_reduce {
      &.move-enter-active, &.move-leave-active {
        transition: all 0.3s;
      }
      &.move-enter, &.move-leave-to {
        opacity: 0;
        transform: translateX(15px) rotate(180deg);
      }
    }
    .icon-add2 {
    }
  }
</style>