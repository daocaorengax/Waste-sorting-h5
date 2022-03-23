<template>
  <div class="login">
    <div class="login-header am-flex-row-center">
      <div class="login-logo-box">
        <img src="@/assets/logo/logo.png" class="login-logo-img am-block">
      </div>
      <div class="login-header-right">
        <div class="top-text">欢迎进入垃圾分类系统</div>
        <div class="bot-text"></div>
      </div>
    </div>
    
    <div class="login-from">
      <van-form @submit="onLoginSubmit">
         <van-field name="用户名" label="用户名" placeholder="请输入用户名" v-model="userPhone" :rules="[{ required: true, message: '请填写用户名'}]"/>
         <van-field type="password" name="密码" label="密码" placeholder="请输入密码" v-model="userPassword" :rules="[{ required: true, message: '请填写密码'}]"/>
         <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
         </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data () {
    return {
      userPhone:'',
      userPassword:''
    }
  },
  components: {},
  created () {},
  beforeDestroy () { },
  methods: {
    onLoginSubmit(v){
      console.log(v,'--onLoginSubmit');
    }
  }
}
</script>

<style scoped lang="scss">
$page-plr: 0.8rem;
$custom-vant-filed-plr: 10px;
$custom-vant-filed-fill: 6px;
.login{
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f5f5f5;

  &-header {
    padding: 1.44rem $page-plr 0;

    &-right {
      flex: 1;
      width: 0;
      padding-left: 0.24rem;
      .top-text {
        color: #000;
        font-size: 0.53rem;
        font-family: PingFangSC-Medium;
        font-weight: 500;
      }
      .bot-text {
        margin-top: 0.27rem;
        font-size: 0.37rem;
        color: #969696;
      }
    }
  }

  &-from{
    // width: 80%;
    // border-radius:3px;
    // background-color: #fff;
    // margin-top: 3rem;
    // padding:14px;
    $r-total-wd: $custom-vant-filed-fill + $custom-vant-filed-plr;
    margin-top: 0.23rem;
    padding: 0 calc(#{$page-plr} - #{$r-total-wd});
  }
}
</style>
