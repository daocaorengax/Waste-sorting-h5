
import { postForm as noAuthForm } from '@/request/noAuth'
export default {
  // 账号密码登录
  accountLogin: (data) => noAuthForm('/v1/app/login/indexWap', data),
}

