<template>
  <div class="star">
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>
<script>
  //类名常量
  const CLASS_ON ='on';
  const CLASS_OFF = 'off';
  const CLASS_HALF = 'half';
  export default {
    props : {
      score: Number
    },
    computed : {
      //算星
      starClasses() {
        const {score} = this;
        const scoreArr = [];
        //scoreArr 添加整颗星星
        const scoreInteger = Math.floor(score);
        for(var i=0; i<scoreInteger; i++) {
          scoreArr.push(CLASS_ON)
        }
        //添加半颗星
        if(score*10-scoreInteger*10>=5){
          scoreArr.push(CLASS_HALF)
        }
        //灰色星星
        while(scoreArr.length<5) {
          scoreArr.push(CLASS_OFF)
        }
        return scoreArr
      }
    }
  }
</script>
<style lang="scss">
  .star {
    float:left;
    font-size:0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
      width: 11px;
      height: 11px;
      margin-right:3px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        background-image: url('./images/star24_on@2x.png');
      }
      &.half {
        background-image: url('./images/star24_half@2x.png');
      }
      &.off{
        background-image: url('./images/star24_off@2x.png');
      }
    }
  }
</style>