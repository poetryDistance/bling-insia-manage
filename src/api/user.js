import request from '@/utils/request'

// 获取验证码
export function refreshCode(params) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'auth/getValidateCode',
    method: 'get',
    params,
    responseType: 'blob'
  })
}

// 登录
export function login(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'auth/login',
    method: 'post',
    data
  })
}

// 退出登录
export function logout() {
  return request({
    url: process.env.VUE_APP_BASE_API + 'auth/logout',
    method: 'post'
  })
}
