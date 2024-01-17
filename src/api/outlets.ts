import request from '@/utils/system/request'

/**网站信息 */
// 获取列表数据
export function networkList(params:object) {
  return request({
    url: 'api/network/networkList',
    method: 'post',
    params
  })
}

export function getOverdueBillForNetworkId(params:object) {
  return request({
    url: 'api//bill/getOverdueBillForNetworkId',
    method: 'get',
    params
  })
}

//网点区域列表
export function districtList(params:object) {
  return request({
    url: 'api/district/list',
    method: 'get',
    params
  })
}

// 获取所有渠道商
export function getChannelList(params:object) {
  return request({
    url: 'api/network/getChannelList',
    method: 'get',
    params
  })
}

//标签列表
export function labelList(params:object) {
  return request({
    url: 'api/label/list',
    method: 'get',
    params
  })
}

//设置网点区域
export function setDistrict(params:object) {
  return request({
    url: 'api/network/setDistrict',
    method: 'post',
    params
  })
}

//设置移交渠道
export function setTransferChannel(params:object) {
  return request({
    url: 'api/network/setTransferChannel',
    method: 'post',
    params
  })
}

//设置标签
export function setLabel(params:object) {
  return request({
    url: 'api/network/setLabel',
    method: 'post',
    params
  })
}

/**网点区域 */

//新增网点区域
export function addDistrict(data:object) {
  return request({
    url: 'api/district/addDistrict',
    method: 'post',
    data
  })
}

//修改网点区域
export function editDistrict(data:object) {
  return request({
    url: 'api/district/editDistrict',
    method: 'post',
    data
  })
}

//删除网点区域
export function deleteDistrict(params:object) {
  return request({
    url: 'api/district/deleteDistrict',
    method: 'post',
    params
  })
}

/**网点标签 */
//新增标签
export function addLabel(data:object) {
  return request({
    url: 'api/label/addLabel',
    method: 'post',
    data
  })
}

//修改标签
export function editLabel(data:object) {
  return request({
    url: 'api/label/editLabel',
    method: 'post',
    data
  })
}


//删除标签
export function deleteLabel(params:object) {
  return request({
    url: 'api/label/deleteLabel',
    method: 'post',
    params
  })
}

/**网点详情 */
//查看网点详情
export function detailByName(params:object) {
  return request({
    url: 'api/network/detailByName',
    method: 'post',
    params
  })
}