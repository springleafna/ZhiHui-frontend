import request from '@/utils/request'

// 获取任务列表
export function getTaskList(params) {
  return request({
    url: '/tasks',
    method: 'get',
    params
  })
}

// 创建任务
export function createTask(data) {
  return request({
    url: '/tasks',
    method: 'post',
    data
  })
}

// 更新任务
export function updateTask(id, data) {
  return request({
    url: `/tasks/${id}`,
    method: 'put',
    data
  })
}

// 删除任务
export function deleteTask(id) {
  return request({
    url: `/tasks/${id}`,
    method: 'delete'
  })
}

// 更新任务状态
export function updateTaskStatus(id, status) {
  return request({
    url: `/tasks/${id}/status`,
    method: 'patch',
    data: { status }
  })
}

// 获取历史任务
export function getHistoryTasks(params) {
  return request({
    url: '/tasks/history',
    method: 'get',
    params
  })
}

// 导出任务报告
export function exportTaskReport(params) {
  return request({
    url: '/tasks/export',
    method: 'get',
    params,
    responseType: 'blob' // 用于下载文件
  })
}