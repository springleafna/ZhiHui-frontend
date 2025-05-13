import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 获取用户的便签列表
 * @returns {Promise<Array>} 便签列表
 */
export const getMemoList = async () => {
  try {
    const res = await request.get('/memo/list')
    return res
  } catch (err) {
    console.error('获取便签列表失败:', err)
    message.error('获取便签列表失败')
    throw err
  }
}

/**
 * 新增便签
 * @param {Object} memoData - 便签数据
 * @param {string} memoData.content - 便签内容
 */
export const insertMemo = async (memoData) => {
  try {
    const res = await request.post('/memo/insert', memoData)
    return res
  } catch (err) {
    console.error('创建便签失败:', err)
    message.error('创建便签失败')
    throw err
  }
}

/**
 * 删除便签
 * @param {number} memoId - 便签ID
 */
export const deleteMemo = async (memoId) => {
  try {
    const res = await request.delete('/memo/delete', {
      params: { memoId }
    })
    return res
  } catch (err) {
    console.error('删除便签失败:', err)
    message.error('删除便签失败')
    throw err
  }
}

/**
 * 更新便签
 * @param {Object} memoData - 更新的便签数据
 * @param {number} memoData.memoId - 便签ID
 * @param {string} memoData.content - 便签内容
 */
export const updateMemo = async (memoData) => {
  try {
    const res = await request.put('/memo', memoData)
    return res
  } catch (err) {
    console.error('更新便签失败:', err)
    message.error('更新便签失败')
    throw err
  }
}
