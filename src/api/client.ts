import request from '@/utils/system/request'

/**客户信息 */
// 获取列表数据
export function listForLoan(params:object) {
  return request({
    url: 'api/user/credited/listForLoan',
    method: 'post',
    params
  })
}
// 获取渠道列表数据
export function getChannelList(params:object) {
  return request({
    url: 'api/network/getChannelList',
    method: 'get',
    params
  })
}

//设置用户移交法务
export function setTransferLegal(params:object) {
  return request({
    url: 'api/user/setTransferLegal',
    method: 'post',
    params
  })
}

//查看客户详情信息
export function getExamineDetail(params:object) {
  return request({
    url: 'api/credit/examine/detail',
    method: 'get',
    params
  })
}