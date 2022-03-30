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
        <div class="form-field-label">
          <label>手机号码</label>
        </div>
        <van-field
          name="userPhone"
          type="tel"
          v-model="userPhone"
          :maxlength="11"
          placeholder="请输入11位手机号码"
          autocomplete="off"
        />
        <div class="login-type-filed">
          <div class="form-field-label">
            <label>密码</label>
          </div>
          <van-field
            name="userPassword"
            :type="hidePassword ? 'password': 'text'"
            :maxlength="30"
            v-model="userPassword"
            placeholder="请输入密码"
            autocomplete="off"
          >
            <template #button>
              <div @click="hidePassword = !hidePassword" class="switch-login-type-btn am-flex-rc-center">
                <van-icon name="eye" v-show="!hidePassword"/>
                <van-icon name="closed-eye" v-show="hidePassword"/>
              </div>
            </template>
          </van-field>
          <!--            注意 此div不可删。vant 对last-child vant-cell 类会隐藏bottom-border-->
          <div></div>
        </div>
          <div class="submit-btn-wrap">
            <van-button block native-type="submit" color="linear-gradient(to right, #F04134, #FE6054)"
                        class="submit-btn"
                        :loading="loginLoading">
              登录
            </van-button>
          </div>
      </van-form>
    </div>
  </div>
</template>

<script>
// import apiLogin from "@/api/apiLogin"
import { Toast } from 'vant'
export default {
  name: "login",
  data () {
    return {
      userPhone:'',
      userPassword:'',
      hidePassword: true, // 隐藏密码
      loginLoading: false, // 正在登录
    }
  },
  components: {},
  created () {},
  beforeDestroy () { },
  methods: {
    onLoginSubmit (formData) {
      if (this.loginLoading) {
        return
      } else if (!this.userPhone) {
        Toast('请输入手机号')
        return
      } else if (this.userPhone.length !== 11) {
        Toast('请输入正确手机号')
        return
      } else if (!this.userPassword) {
        Toast('请输入密码')
        return
      }
      this.loginLoading = true
      this.accountLogin()
    },
    accountLogin () {
      var vm = this
      const loadingToast = Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登录中...'
      })
      this.$http.post('/api/user/login',{name:this.userPhone,password:this.userPassword})
      .then(function(res) {
        let { data, statusText } = res
        loadingToast.clear()
        if (statusText == 'OK'&&data.length>0) {
          //登陆成功后的操作
          localStorage.setItem('userInfo',data[0])
          Toast('登陆成功')
          vm.$router.push('/index')
        } else {
          vm.loginLoading = false
          Toast('登录失败，请重新尝试！--0')
        }
        vm.loginLoading = false
      })
      .catch(err => {
        loadingToast.clear()
        vm.loginLoading = false
        Toast('登录失败，请重新尝试！---1')
      })
    },
    openAppTip () {
      this.$dialog.confirm({
        title: "提示",
        message: "功能开发中"
      })
    }
  }
}
</script>

<style scoped lang="scss">
$page-plr: 0.8rem;
$custom-vant-filed-plr: 10px;
$custom-vant-filed-fill: 6px;
.login{
  // display: flex;
  min-height: 100vh;
  // flex-direction: column;
  // justify-content: space-between;
  background-color: #f5f5f5;

  &-header {
    padding: 1.44rem $page-plr 0;
    .login-logo-box {
      width: 1.65rem;
      flex-shrink: 0;
      .login-logo-img {
        width: 100%;
      }

    }
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
    margin-top: 1.23rem;
    padding: 0 calc(#{$page-plr} - #{$r-total-wd});
    .form-field-label {
      padding: 20px ($custom-vant-filed-plr + $custom-vant-filed-fill) 4px;
      font-size: 0.33rem;
      color: #666;
    }
    .switch-login-type-btn {
      height: 24px;
      width: 30px;
    }

  }
  .submit-btn-wrap {
    margin-top: 1.77rem;
    padding: 0 ($custom-vant-filed-plr + $custom-vant-filed-fill);
  }
  .submit-btn {
    border-radius: 0.21rem;
  }

}
</style>
