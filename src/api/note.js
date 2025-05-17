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

/**
 * 获取所有笔记分类（用于新增笔记时）
 * @returns {Promise<Array>} 分类列表，每个分类包含：noteCategoryId, categoryName
 */
export const getAllCategories = async () => {
  try {
    const res = await request.get('/note-category/allCategory')
    return res
  } catch (err) {
    console.error('获取笔记分类列表失败:', err)
    message.error('获取笔记分类列表失败')
    throw err
  }
}

/**
 * 新增笔记
 * @param {Object} noteData - 笔记数据
 * @param {number} noteData.noteCategoryId - 所属分类ID
 * @param {string} noteData.title - 笔记标题
 * @param {string} noteData.content - 笔记内容(Markdown格式)
 */
export const createNote = async (noteData) => {
  try {
    const res = await request.post('/note/insertNote', noteData)
    return res
  } catch (err) {
    console.error('创建笔记失败:', err)
    message.error('创建笔记失败')
    throw err
  }
}

/**
 * 删除笔记
 * @param {number} noteId - 笔记ID
 */
export const deleteNote = async (noteId) => {
  try {
    const res = await request.delete('/note/deleteNote', {
      params: { noteId }
    })
    return res
  } catch (err) {
    console.error('删除笔记失败:', err)
    message.error('删除笔记失败')
    throw err
  }
}

/**
 * 删除笔记分类
 * @param {number} categoryId - 分类ID
 */
export const deleteCategory = async (categoryId) => {
  try {
    const res = await request.delete('/note-category/delete', {
      params: { categoryId }
    })
    return res
  } catch (err) {
    console.error('删除分类失败:', err)
    message.error('删除分类失败')
    throw err
  }
}

/**
 * 获取笔记详情
 * @param {number} noteId - 笔记ID
 * @returns {Promise<Object>} 笔记详情，包含：noteId, title, content, updateTime
 */
export const getNoteDetail = async (noteId) => {
  try {
    const res = await request.get('/note/selectNote', {
      params: { noteId }
    })
    return res
  } catch (err) {
    console.error('获取笔记详情失败:', err)
    message.error('获取笔记详情失败')
    throw err
  }
}

/**
 * 更新笔记
 * @param {Object} noteData - 笔记数据
 * @param {number} noteData.noteId - 笔记ID
 * @param {string} noteData.title - 笔记标题
 * @param {string} noteData.content - 笔记内容(Markdown格式)
 */
export const updateNote = async (noteData) => {
  try {
    const res = await request.put('/note/updateNote', noteData)
    return res
  } catch (err) { 
    console.error('更新笔记失败:', err)
    message.error('更新笔记失败')
    throw err
  }
}

/**
 * 获取笔记数量 
 * @returns {Promise<number>} 笔记数量
 */
export const getNoteCount = async () => {
  try {
    const res = await request.get('/note/count')
    return res
  } catch (err) {
    console.error('获取笔记数量失败:', err)
    message.error('获取笔记数量失败')
    throw err
  }
}

