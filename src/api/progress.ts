import request from '@/utils/system/request'

//获取
export function traceRecord(data:object) {
  return request({
    url: 'api/traceRecord/statistics',
    method: 'get',
    params:data
  })
}

export function memoRecord(data:object) {
  return request({
    url: 'api/memoRecord/statistics',
    method: 'get',
    params:data
  })
}

export function callRecord(data:object) {
  return request({
    url: 'api/callRecord/statistics',
    method: 'get',
    params:data
  })
}

export function creditRefuseRecord(data:object) {
  return request({
    url: 'api/creditRefuseRecord/statistics',
    method: 'get',
    params:data
  })
}

export function lawsuitRecord(data:object) {
  return request({
    url: 'api/lawsuitRecord/statistics',
    method: 'get',
    params:data
  })
}