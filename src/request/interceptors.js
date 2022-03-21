/**
 * 拦截器处理
 * */
// import {
//   Message
// } from 'element-ui'
// import router from '@/router'
import store from '@/store'
import {NEED_LOGIN_STATUS_CODE} from '@/request/codeTypes.js'
// import { redirectLogin } from '@/utils/routerFun'

// const debounce = require('lodash/debounce')
import {debounce} from 'lodash-es'

// 响应拦截器 error 防抖处理
export const errorInterceptors = debounce(function (error) {
  console.log('全局拦截器----error')
  console.log(error)
  let statusCode = error.response ? error.response.status : undefined
  if (typeof statusCode !== 'undefined' && statusCode === NEED_LOGIN_STATUS_CODE) {
    // 需要重新登录
    setTimeout(() => {
      // Message.error('登录失效，请重新登录')
    }, 400)
    // store.commit('loginOut')
    setTimeout(() => {
      // redirectLogin(true)
    }, 0)
  }
}, 1000, {
  leading: true,
  trailing: false
})
