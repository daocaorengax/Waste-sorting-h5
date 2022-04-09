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
import importData from '@/service/util/importFun.js'
export default {
  name: 'app',
  created () {
    console.log(importData);
    //创建用户
    // this.$http.post('/api/user/getUser',{name:'15771968702'}).then(function(response) {
    //   console.log(response)
    // })
    // this.$http.post('/api/user/searchAllRubByUser',{userId:1,type:1}).then(function(response) {
    //   console.log(response)
    // })
    //登录
    // this.$http.post('/api/user/login',{name:'110'}).then(function(response) {
    //   console.log(response)
    // }).then(function(error) {
    //     console.log(error);
    //   })
    //创建垃圾 工具代码  谨慎执行！！！
    // for (let index = 0; index < importData.length; index++) {
    //   const item = importData[index]
    //   setTimeout(() => {
    //     this.$http.post('/api/user/createRub',{name:item.name,type:item.type,pic:item.pic,remarks:''}).then(function(response) {
    //     console.log(response)
    //   })
    //   }, 1000);
    // }
 
    //搜索垃圾
    //  this.$http.post('/api/user/searchRub',{name:'瓶'}).then(function(response) {
    //   console.log(response)
    // }).then(function(error) {
    //     console.log(error);
    //   })
    //生成用户丢弃记录
  //  this.$http.post('/api/user/userDiscardLog',{userId:'1',rubbishId:'10000'}).then(function(response) {
  //     console.log(response)
  //   })
  //查询搜索次数
  //   this.$http.post('/api/user/getSearchLog',{userId:1,rubbishId:10086}).then(function(response) {
  //     console.log(response)
  //   }).then(function(error) {
  //       console.log(error);
  //     })
  // }
  //创建搜索次数
    //   this.$http.post('/api/user/addSearchLog',{userId:1,rubbishId:10086}).then(function(response) {
    //   console.log(response)
    // }).then(function(error) {
    //     console.log(error);
    //   })
  //更新搜索次数
  //  this.$http.post('/api/user/updateSearchLog',{id:1,count:2}).then(function(response) {
  //     console.log(response)
  //   }).then(function(error) {
  //     console.log(error);
  //   })
  }
}
</script>
