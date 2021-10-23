import request from '@/utils/request'

// 查询类型列表
export function listType(query) {
  return request({
    url: '/system/type/list',
    method: 'get',
    params: query
  })
}

// 查询类型列表（排除节点）
export function listTypeExcludeChild(typeId) {
  return request({
    url: '/system/type/list/exclude/' + typeId,
    method: 'get'
  })
}

// 查询类型详细
export function getType(typeId) {
  return request({
    url: '/system/type/' + typeId,
    method: 'get'
  })
}

// 查询类型下拉树结构
export function treeselect() {
  return request({
    url: '/system/type/treeselect',
    method: 'get'
  })
}

// 根据角色ID查询类型树结构
export function roleTypeTreeselect(roleId) {
  return request({
    url: '/system/type/roleDeptTreeselect/' + roleId,
    method: 'get'
  })
}

// 新增类型
export function addType(data) {
  return request({
    url: '/system/type',
    method: 'post',
    data: data
  })
}

// 修改类型
export function updateType(data) {
  return request({
    url: '/system/type',
    method: 'put',
    data: data
  })
}

// 删除类型
export function delType(typeId) {
  return request({
    url: '/system/type/' + typeId,
    method: 'delete'
  })
}
