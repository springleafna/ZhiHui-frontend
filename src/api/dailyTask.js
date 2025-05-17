import request from '@/utils/request'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'

/**
 * 新增每日任务
 * @param {Object} taskData - 包含任务详情的数据对象
 * @param {Date} taskData.taskDate - 任务日期（格式：yyyy-MM-dd）
 * @param {string} taskData.title - 任务标题
 * @param {string} [taskData.description] - 任务描述（可选）
 * @param {string} taskData.startTime - 开始时间（格式：HH:mm:ss）
 * @param {string} taskData.endTime - 结束时间（格式：HH:mm:ss）
 * @param {number} taskData.priority - 优先级（0:低 1:中 2:高）
 */
export const saveDailyTask = async (taskData) => {
  try {
    const res = await request.post('/dailyTask/save', taskData)
    return res
  } catch (err) {
    console.error('创建任务失败:', err)
    message.error('创建任务失败')
    throw err
  }
}

/**
 * 获取某天的任务列表
 * @param {string} date - 查询日期（格式：yyyy-MM-dd）
 */
export const getDailyTasks = async (date) => {
  try {
    const res = await request.get('/dailyTask/list', {
      params: { 
        taskDate: date // 直接传递格式化后的日期字符串
      }
    })
    return res
  } catch (err) {
    console.error('获取任务列表失败:', err)
    message.error('获取任务列表失败')
    throw err
  }
}

/**
 * 标记任务为完成状态
 * @param {number} taskId - 任务ID
 * @param {number} completed - 是否完成（1:完成 0:未完成）
 */
export const completeTask = async (taskId, completed) => {
  try {
    const res = await request.put('/dailyTask/complete', null, {
      params: { 
        dailyTaskId: taskId,
        completed: completed // 添加状态参数
      }
    })
    return res
  } catch (err) {
    console.error('更新任务状态失败:', err)
    message.error('更新任务状态失败')
    throw err
  }
}

/**
 * 删除任务
 * @param {number} taskId - 任务ID
 */
export const deleteTask = async (taskId) => {
  try {
    const res = await request.delete('/dailyTask/delete', {
      params: { dailyTaskId: taskId }
    })
    return res
  } catch (err) {
    console.error('删除任务失败:', err)
    message.error('删除任务失败')
    throw err
  }
}

/**
 * 更新任务信息
 * @param {Object} taskData - 包含更新数据的对象
 * @param {number} taskData.dailyTaskId - 任务ID
 * @param {string} taskData.title - 新标题
 * @param {string} [taskData.description] - 新描述
 * @param {number} taskData.priority - 新优先级
 * @param {string} taskData.startTime - 新开始时间
 * @param {string} taskData.endTime - 新结束时间
 */
export const updateTask = async (taskData) => {
  try {
    const res = await request.put('/dailyTask/update', taskData)
    return res
  } catch (err) {
    console.error('更新任务失败:', err)
    message.error('更新任务失败')
    throw err
  }
}

/**
 * 时间格式转换工具（供外部使用）
 * @param {Date|dayjs} date - 日期对象或 dayjs 对象
 * @returns {string} 格式化的日期字符串（yyyy-MM-dd）
 */
export const formatDate = (date) => {
  if (!date) return '';
  // 如果是 dayjs 对象，直接使用 format
  if (date.$d) {
    return date.format('YYYY-MM-DD');
  }
  // 如果是 Date 对象，转换为 dayjs 后格式化
  return dayjs(date).format('YYYY-MM-DD');
}

/**
 * 时间格式转换工具（供外部使用）
 * @param {Date|dayjs} time - 时间对象或 dayjs 对象
 * @returns {string} 格式化的时间字符串（HH:mm:ss）
 */
export const formatTime = (time) => {
  if (!time) return '';
  // 如果是 dayjs 对象，直接使用 format
  if (time.$d) {
    return time.format('HH:mm:ss');
  }
  // 如果是 Date 对象，转换为 dayjs 后格式化
  return dayjs(time).format('HH:mm:ss');
}

/**
 * 获取每日任务数量
 * @returns {Promise<number>} 每日任务数量
 */
export const getDailyTaskCount = async () => {
  try {
    const res = await request.get('/dailyTask/count')
    return res
  } catch (err) {
    console.error('获取每日任务数量失败:', err)
    message.error('获取每日任务数量失败')
    throw err
  }
}