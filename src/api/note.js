import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 获取当前用户所有笔记分类
 * @returns {Promise<Array>} 分类列表
 */
export const listAllNoteCategories = async () => {
  try {
    const res = await request.get('/note-category/list')
    return res
  } catch (err) {
    console.error('获取笔记分类列表失败:', err)
    message.error('获取笔记分类列表失败')
    throw err
  }
}

/**
 * 新增笔记分类
 * @param {Object} categoryData - 分类数据
 * @param {string} categoryData.categoryName - 分类名称
 */
export const createNoteCategory = async (categoryData) => {
  try {
    const res = await request.post('/note-category/insert', categoryData)
    return res
  } catch (err) {
    console.error('创建笔记分类失败:', err)
    message.error('创建笔记分类失败')
    throw err
  }
}

/**
 * 更新笔记分类
 * @param {Object} categoryData - 更新的分类数据
 * @param {number} categoryData.noteCategoryId - 分类ID
 * @param {string} categoryData.categoryName - 分类名称
 */
export const updateNoteCategory = async (categoryData) => {
  try {
    const res = await request.put('/note-category/update', categoryData)
    return res
  } catch (err) {
    console.error('更新笔记分类失败:', err)
    message.error('更新笔记分类失败')
    throw err
  }
}

/**
 * 获取指定分类下的所有笔记
 * @param {number} noteCategoryId - 分类ID
 * @returns {Promise<Array>} 笔记列表，每个笔记包含：noteId, noteCategoryId, categoryName, title, updateTime
 */
export const getNotesByCategory = async (noteCategoryId) => {
  try {
    const res = await request.get('/note/listByCategory', {
      params: { noteCategoryId }
    })
    return res
  } catch (err) {
    console.error('获取分类笔记列表失败:', err)
    message.error('获取分类笔记列表失败')
    throw err
  }
}

/**
 * 获取未分类的笔记列表
 * @returns {Promise<Array>} 未分类的笔记列表，每个笔记包含：noteId, noteCategoryId, categoryName, title, updateTime
 */
export const getNotesWithoutCategory = async () => {
  try {
    const res = await request.get('/note/listNoCategory')
    return res
  } catch (err) {
    console.error('获取未分类笔记列表失败:', err)
    message.error('获取未分类笔记列表失败')
    throw err
  }
}

/**
 * 获取所有笔记列表
 * @returns {Promise<Array>} 所有笔记列表，每个笔记包含：noteId, noteCategoryId, categoryName, title, updateTime
 */
export const getAllNotes = async () => {
  try {
    const res = await request.get('/note/allNote')
    return res
  } catch (err) {
    console.error('获取所有笔记列表失败:', err)
    message.error('获取所有笔记列表失败')
    throw err
  }
}