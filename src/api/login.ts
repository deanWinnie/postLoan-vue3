import request from '@/utils/system/request'

// 登陆
export function login(data: object) {
  return request({
    url: 'admin/auth/login',
    method: 'post',
    // baseURL: '/mock',
    params:data
  })
}
