<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<style lang="scss">
@import "~@/styles/common";
</style>
<script>
export default {
  name: 'app',
  created () {
    
  }
}
</script>
