import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 创建四象限任务
 * @param {Object} taskData - 包含任务详情的数据对象
 * @param {number} taskData.taskId - 每日任务/长期任务id
 * @param {string} taskData.title - 任务标题
 * @param {string} [taskData.description] - 任务描述（可选）
 * @param {number} taskData.quadrantType - 象限类型(1:紧急重要 2:紧急不重要 3:不紧急重要 4:不紧急不重要)
 * @param {Date} taskData.dueDate - 截止日期
 * @param {number} taskData.taskType - 任务类型(0:每日任务 1:长期任务)
 */
export const createQuadrantTask = async (taskData) => {
  try {
    const res = await request.post('/quadrant-task/insert', taskData)
    return res
  } catch (err) {
    console.error('创建四象限任务失败:', err)
    message.error('创建四象限任务失败')
    throw err
  }
}

/**
 * 获取所有四象限任务
 * @returns {Promise<Array>} 四象限任务列表
 */
export const getAllQuadrantTasks = async () => {
  try {
    const res = await request.get('/quadrant-task/getAll')
    return res
  } catch (err) {
    console.error('获取四象限任务列表失败:', err)
    message.error('获取四象限任务列表失败')
    throw err
  }
}

/**
 * 更新任务为完成状态
 * @param {number} quadrantTaskId - 四象限任务ID
 */
export const completeQuadrantTask = async (quadrantTaskId) => {
  try {
    const res = await request.put('/quadrant-task/completed', null, {
      params: { QuadrantTaskId: quadrantTaskId }
    })
    return res
  } catch (err) {
    console.error('更新任务状态失败:', err)
    message.error('更新任务状态失败')
    throw err
  }
}

/**
 * 将任务添加到四象限
 * @param {Object} params - 参数对象
 * @param {Object} params.task - 任务对象（每日任务或长期任务）
 * @param {number} params.quadrantType - 象限类型(1:紧急重要 2:紧急不重要 3:不紧急重要 4:不紧急不重要)
 * @param {number} params.taskType - 任务类型(0:每日任务 1:长期任务)
 * @returns {Promise<boolean>} - 如果成功添加到四象限返回 true，如果任务已存在返回 false
 */
export const addTaskToQuadrant = async ({ task, quadrantType, taskType }) => {
  try {
    // 先获取所有四象限任务
    const allTasks = await getAllQuadrantTasks();
    
    // 检查任务是否已存在
    const taskExists = allTasks.some(existingTask => {
      // 确保taskId的类型一致（转换为字符串进行比较）
      const existingTaskId = String(existingTask.taskId);
      const newTaskId = String(task.id);
      return existingTaskId === newTaskId && existingTask.taskType === taskType;
    });

    if (taskExists) {
      message.warning('该任务已经在四象限中，不能重复添加');
      return false; // 任务已存在，返回 false
    }

    const taskData = {
      taskId: task.id,
      title: task.title,
      description: task.description,
      quadrantType: quadrantType,
      dueDate: task.dueDate || task.taskDate,
      taskType: taskType // 0:每日任务 1:长期任务
    }
    
    await request.post('/quadrant-task/insert', taskData)
    return true; // 成功添加，返回 true
  } catch (err) {
    console.error('添加到四象限失败:', err)
    message.error('添加到四象限失败')
    throw err;
  }
}

/**
 * 获取用户象限任务数
 * @returns {Promise<number>} 四象限任务总数
 */
export const getQuadrantTaskCount = async () => {
  try {
    const res = await request.get('/quadrant-task/count');
    return res; // 假设后端返回的是一个数字
  } catch (err) {
    console.error('获取四象限任务数失败:', err);
    message.error('获取四象限任务数失败');
    throw err;
  }
}
