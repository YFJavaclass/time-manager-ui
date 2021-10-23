import request from '@/utils/request'

// 查询数据列表列表
export function listTime_data(query) {
  return request({
    url: '/time/time_data/list',
    method: 'get',
    params: query
  })
}

// 查询数据列表详细
export function getTime_data(id) {
  return request({
    url: '/time/time_data/' + id,
    method: 'get'
  })
}

// 新增数据列表
export function addTime_data(data) {
  return request({
    url: '/time/time_data',
    method: 'post',
    data: data
  })
}

// 修改数据列表
export function updateTime_data(data) {
  return request({
    url: '/time/time_data',
    method: 'put',
    data: data
  })
}

// 删除数据列表
export function delTime_data(id) {
  return request({
    url: '/time/time_data/' + id,
    method: 'delete'
  })
}

// 导出数据列表
export function exportTime_data(query) {
  return request({
    url: '/time/time_data/export',
    method: 'get',
    params: query
  })
}