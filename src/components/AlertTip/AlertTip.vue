<template>
  <div class="alert_tip">
    <section class="tip_container" @click="closeTip">
      <at-card :style="{ width: '300px' }">
        <h4 slot="title">消息提示</h4>
        <div>
          {{description}}
        </div>
      </at-card>
    </section>
    <div class="v-model"></div>
  </div>
</template>
<script>
  import { Card as AtCard} from 'at-ui'
  export default {
    data() {
      return {
      }
    },
    props: {
      description: String
    },
    components: {
     AtCard
    },
    methods: {
      closeTip() {
        this.$emit('closeTip')
      }
    }
  }
</script>
<style lang="scss">
  @keyframes tipMove {
    0%  {transform: scale(1)}
    35%  { transform: scale(.8)}
    70%  {transform: scale(1.1)}
    100%  {transform: scale(1)}
  }
  .alert_tip {
    .tip_container {
      width: 60vw;
      position: absolute;
      z-index: 2009;
      top: 40%;
      left: 20vw;
      text-align: center;
      animation: tipMove .4s;
      h4 {
        font-weight: 600;
      }
    }
    .v-model {
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: .5;
        background: #000;
      }
  }
</style>