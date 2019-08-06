<template>
  <section class="header">
    <slot name="left" ></slot>
    <div class="content">
      <span class="title">{{this.$route.path.split('/').join('')}}</span>
    </div>
    <slot name="right"></slot>
  </section>
</template>
<style lang="scss">
  .header {
    position: fixed;
    z-index:100;
    top: 0px;
    left: 0px;
    height: 3.2rem;
    box-sizing:border-box;
    padding: 0 1.8rem;
    background: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
    border-bottom: 1px solid #e4e4e4;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      font-size: 1.8rem;
    }
  }
</style>