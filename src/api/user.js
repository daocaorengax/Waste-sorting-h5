/**
 * 用户相关
 * */
import app from '@/request/app'

// 退出登录
export const logOut = () => app.post(APP_BASE_URL + '/v1/wap/logout')
// 检测app token 是否有效
const appCheckToken = () => app.post(APP_BASE_URL + '/v1/app/login/checkUserToken')

