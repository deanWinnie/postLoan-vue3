import request from '@/utils/system/request'

/**客户信息 */
// 获取列表数据
export function listForLoan(params:object) {
  return request({
    url: 'user/credited/listForLoan',
    method: 'post',
    params
  })
}
// 获取渠道列表数据
export function getChannelList(params:object) {
  return request({
    url: 'network/getChannelList',
    method: 'get',
    params
  })
}

//设置用户移交法务
export function setTransferLegal(params:object) {
  return request({
    url: 'user/setTransferLegal',
    method: 'post',
    params
  })
}

//查看客户详情信息
export function getExamineDetail(params:object) {
  return request({
    url: 'credit/examine/detail',
    method: 'get',
    params
  })
}

//查看账单
export function getBillList(params:object) {
  return request({
    url: 'bill/list',
    method: 'get',
    params
  })
}

//查看父账单
export function getDetailByBillNo(params:object) {
  return request({
    url: 'bill/getDetailByBillNo',
    method: 'get',
    params
  })
}
//查看合并账单
export function getDetailByMergeNo(params:object) {
  return request({
    url: 'bill/getDetailByMergeNo',
    method: 'get',
    params
  })
}

//设置移交渠道
export function setTransferChannel(params:object) {
  return request({
    url: 'user/setTransferChannel',
    method: 'post',
    params
  })
}
