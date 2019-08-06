<template>
  <div id="app">
    <router-view/>
    <FoodGuide v-show="$route.meta.showFooter"></FoodGuide>
  </div>
</template>

<script>
  import FoodGuide from './components/FoodGuide/FoodGuide.vue'
  export default {
    components: {
      FoodGuide
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
