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
    //创建用户
    // this.$http.post('/api/user/addUser',{userName:'110',password:'123456'}).then(function(response) {
    //   console.log(response)
    // })
    //登录
    // this.$http.post('/api/user/login',{name:'110'}).then(function(response) {
    //   console.log(response)
    // }).then(function(error) {
    //     console.log(error);
    //   })
  }
}
</script>
