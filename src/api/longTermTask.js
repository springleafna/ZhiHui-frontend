import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 获取当前用户所有长期任务
 */
export const listAllLongTermTask = async () => {
  try {
    const res = await request.get('/longTermTask/listAll')
    return res
  } catch (err) {
    console.error('获取长期任务列表失败:', err)
    message.error('获取长期任务列表失败')
    throw err
  }
}