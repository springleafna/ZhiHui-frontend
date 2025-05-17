import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 根据用户输入创建计划
 * @param {string} prompt - 用户输入的提示文本
 * @returns {Promise<string>} 返回AI生成的计划内容
 */
export const generateTask = async (prompt) => {
  try {
    const res = await request.get('/ai/GenerateTask', {
      params: { prompt }
    })
    return res
  } catch (err) {
    console.error('生成计划失败:', err)
    message.error('生成计划失败')
    throw err
  }
}

/**
 * 总结今日计划
 * @param {string} prompt - 用户输入的提示文本
 * @returns {Promise<string>} 返回AI生成的总结内容
 */
export const summarizeTask = async (prompt) => {
  try {
    const res = await request.get('/ai/summarizeTask', {
      params: { prompt }
    })
    return res
  } catch (err) {
    console.error('总结计划失败:', err)
    message.error('总结计划失败')
    throw err
  }
}
