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

/**
 * 新增任务组
 * @param {Object} groupData - 任务组数据
 * @param {string} groupData.groupName - 任务组名称
 */
export const insertGroupTask = async (groupData) => {
  try {
    const res = await request.post('/groupTask/insert', groupData)
    return res
  } catch (err) {
    console.error('创建任务组失败:', err)
    message.error('创建任务组失败')
    throw err
  }
}

/**
 * 删除任务组
 * @param {number} groupId - 任务组ID
 */
export const deleteGroupTask = async (groupId) => {
  try {
    const res = await request.delete('/groupTask/delete', {
      params: { groupId }
    })
    return res
  } catch (err) {
    console.error('删除任务组失败:', err)
    message.error('删除任务组失败')
    throw err
  }
}

/**
 * 新增任务类别
 * @param {Object} categoryData - 任务类别数据
 * @param {string} categoryData.categoryName - 类别名称
 * @param {number} categoryData.groupId - 所属任务组ID
 */
export const insertCategoryTask = async (categoryData) => {
  try {
    const res = await request.post('/categoryTask/insert', categoryData)
    return res
  } catch (err) {
    console.error('创建任务类别失败:', err)
    message.error('创建任务类别失败')
    throw err
  }
}

/**
 * 删除任务类别
 * @param {number} categoryId - 任务类别ID
 */
export const deleteCategoryTask = async (categoryId) => {
  try {
    const res = await request.delete('/categoryTask/delete', {
      params: { categoryId }
    })
    return res
  } catch (err) {
    console.error('删除任务类别失败:', err)
    message.error('删除任务类别失败')
    throw err
  }
}

/**
 * 新增长期任务
 * @param {Object} taskData - 任务数据
 * @param {string} taskData.taskName - 任务名称
 * @param {string} taskData.description - 任务描述
 * @param {number} taskData.priority - 优先级
 * @param {string} taskData.dueDate - 截止日期
 * @param {number} taskData.categoryId - 所属类别ID
 */
export const saveLongTermTask = async (taskData) => {
  try {
    const res = await request.post('/longTermTask/save', taskData)
    return res
  } catch (err) {
    console.error('创建长期任务失败:', err)
    message.error('创建长期任务失败')
    throw err
  }
}

/**
 * 删除长期任务
 * @param {number} taskId - 任务ID
 */
export const deleteLongTermTask = async (taskId) => {
  try {
    const res = await request.delete('/longTermTask/delete', {
      params: { longTermTaskId: taskId }
    })
    return res
  } catch (err) {
    console.error('删除长期任务失败:', err)
    message.error('删除长期任务失败')
    throw err
  }
}

/**
 * 更新长期任务
 * @param {Object} taskData - 更新的任务数据
 * @param {number} taskData.longTermTaskId - 任务ID
 * @param {string} taskData.taskName - 任务名称
 * @param {string} taskData.description - 任务描述
 * @param {number} taskData.priority - 优先级
 * @param {string} taskData.dueDate - 截止日期
 */
export const updateLongTermTask = async (taskData) => {
  try {
    const res = await request.put('/longTermTask/update', taskData)
    return res
  } catch (err) {
    console.error('更新长期任务失败:', err)
    message.error('更新长期任务失败')
    throw err
  }
}

/**
 * 标记长期任务为完成/未完成状态
 * @param {number} taskId - 任务ID
 * @param {number} completed - 完成状态(1:已完成, 0:未完成)
 */
export const completeLongTermTask = async (taskId, completed) => {
  try {
    const res = await request.put('/longTermTask/complete', null, {
      params: { 
        longTermTaskId: taskId, 
        completed: completed 
      }
    })
    return res
  } catch (err) {
    console.error('更新长期任务状态失败:', err)
    message.error('更新长期任务状态失败')
    throw err
  }
}

/**
 * 获取长期任务数量
 * @returns {Promise<number>} 长期任务数量
 */
export const getLongTermTaskCount = async () => {
  try {
    const res = await request.get('/longTermTask/countAll')
    return res
  } catch (err) {
    console.error('获取长期任务数量失败:', err)
    message.error('获取长期任务数量失败')
    throw err
  }
}