import request from '@/utils/system/request'

//获取台账列表
export function listRecord(data:object,params:object) {
  return request({
    url: 'traceRecord/listRecord',
    method: 'post',
    data,
    params
  })
}

//添加台账记录
export function addRecord(data:object) {
  return request({
    url: 'traceRecord/addRecord',
    method: 'post',
    data,
  })
}

//获取网点
export function tableList(data:object) {
    return request({
      url: 'network/tableList',
      method: 'post',
      params:data,
    })
  }

//获取授信人列表
export function getPeople(data:object) {
    return request({
      url: 'user/tableList',
      method: 'post',
      params:data,
    })
  }

//获取备忘录记录
export function memoRecord(data:object,params:object) {
    return request({
      url: 'memoRecord/listRecord',
      method: 'post',
      data,
      params
    })
  }

//添加备忘录记录
export function memoAdd(data:object) {
  return request({
    url: 'memoRecord/addRecord',
    method: 'post',
    data,
  })
}

//获取客服记录
export function callRecord(data:object,params:object) {
  return request({
    url: 'callRecord/listRecord',
    method: 'post',
    data,
    params
  })
}

//添加客服记录
export function callAdd(data:object) {
  return request({
    url: 'callRecord/addRecord',
    method: 'post',
    data,
  })
}

//获取法务记录
export function lawsuitRecord(data:object,params:object) {
  return request({
    url: 'lawsuitRecord/listRecord',
    method: 'post',
    data,
    params
  })
}

//添加法务记录
export function lawsuitAdd(data:object) {
  return request({
    url: 'lawsuitRecord/addRecord',
    method: 'post',
    data,
  })
}


//设置法务记录终止
export function setTermination(data:object) {
  return request({
    url: 'lawsuitRecord/setTermination',
    method: 'post',
    data,
  })
}


//设置法务记录终止
export function setStatus(data:object) {
  return request({
    url: '/lawsuitRecord/setStatus',
    method: 'post',
    data,
  })
}

//获取授信记录
export function creditRecord(data:object,params:object) {
  return request({
    url: 'creditRefuseRecord/listRecord',
    method: 'post',
    data,
    params
  })
}

//添加授信记录
export function creditAdd(data:object) {
  return request({
    url: 'creditRefuseRecord/addRecord',
    method: 'post',
    data,
  })
}




