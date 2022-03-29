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
    //创建垃圾
    //  this.$http.post('/api/user/createRub',{name:'报纸',type:'1',pic:'图片',remarks:'日常了解每日资讯'}).then(function(response) {
    //   console.log(response)
    // })
    //搜索垃圾
    //  this.$http.post('/api/user/searchRub',{name:'报'}).then(function(response) {
    //   console.log(response)
    // }).then(function(error) {
    //     console.log(error);
    //   })
    //生成用户丢弃记录
  //  this.$http.post('/api/user/userDiscardLog',{userId:'1',rubbishId:'10000'}).then(function(response) {
  //     console.log(response)
  //   })
  }
}
</script>
