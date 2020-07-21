<template>
  <div id="app">
    <MainTabbar/>
  </div>
</template>

<script>
import MainTabbar from '@components/content/maintabbar/MainTabbar.vue'

export default {
  name: 'App',
  components: {
    MainTabbar
  }
}
</script>
<style scoped>
  @import './assets/css/base.css';
</style>
