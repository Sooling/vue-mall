<template>
  <!-- Tabbar -->
  <div id="tab_bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Tabbar'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tab_bar {
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
		z-index: 1;
    box-shadow: 0 -1px 10px rgba(100, 100, 100, .1);
}

</style>
