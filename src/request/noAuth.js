/**
 *  接口 request 实例
 * */
import axios from 'axios'
import { errorInterceptors } from './interceptors'
import isNeedStringify from "./utils/isNeedStringify"
import qs from "qs"
import { isPlainObject } from 'lodash-es'

const noAuth = axios.create()
noAuth.defaults.timeout = 50000
noAuth.defaults.baseURL = process.env.VUE_APP_BASE_API
noAuth.interceptors.request.use(config => {
  if (isNeedStringify(config)) {
    config.data = qs.stringify(config.data)
  }
  return config
}, error => {
  return Promise.reject(error)
})
noAuth.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorInterceptors(error)
    return Promise.reject(error)
  }
)

export default noAuth

export const postForm = (url, data, config = {}) => {
  config.headers = isPlainObject(config.headers) ? config.headers : {}
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return noAuth.post(url, data, config)
}
