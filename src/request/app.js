/**
 * app 接口 request 实例
 * */
import axios from 'axios'
import store from '@/store'
// import { APP_BASE_URL } from '@/request/BASE_URL'
import { errorInterceptors } from './interceptors'
import isNeedStringify from "./utils/isNeedStringify"
import qs from "qs"
import { isPlainObject } from 'lodash-es'

const app = axios.create()
app.defaults.timeout = 50000
app.defaults.baseURL = process.env.VUE_APP_BASE_API
app.defaults.headers.common.platform = 'h5'
app.interceptors.request.use(config => {
  if (isNeedStringify(config)) {
    config.data = qs.stringify(config.data)
  }
  config.headers.Authorization = store.getters.isLogin ? `Bearer ${store.state.appToken}` : ''
  return config
}, error => {
  return Promise.reject(error)
})
app.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorInterceptors(error)
    return Promise.reject(error)
  }
)

export default app

export const postForm = (url, data, config = {}) => {
  config.headers = isPlainObject(config.headers) ? config.headers : {}
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return app.post(url, data, config)
}
