import request from '@/utils/system/request'

// 获取数据api
export function getList(data: object,params:object) {
  return request({
    url: 'admin/auth/listAccounts',
    method: 'post',
    data,
    params
  })
}