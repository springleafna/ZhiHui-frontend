import request from '@/utils/request'
import { message } from 'ant-design-vue'

/**
 * 用户注册
 * @param {Object} params - 包含username, password, phone/email等字段
 */
export const register = async (params) => {
    try {
      const res = await request.post('/user/register', params);
      message.success('注册成功');
      return res.data;
    } catch (err) {
      console.error('注册失败:', err);
      throw err;
    }
  };
  
/**
 * 密码登录
 * @param {String} account - 手机号/邮箱
 * @param {String} password - 密码
 */
export const loginByPassword = async (account, password) => {
  try {
    const res = await request.post('/user/loginPassword', {
      account,
      password
    });
    
    // 保存Token到本地存储
    if (res.token) {
      localStorage.setItem('token', res.token);
      message.success('登录成功');
    }
    return res;
  } catch (err) {
    console.error('登录失败:', err);
    throw err;
  }
};

/**
 * 退出登录
 */
export const logout = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      message.error('未登录状态')
      return
    }
    
    await request.get('/user/logout');
    
    localStorage.removeItem('token')
    message.success('已退出登录')
  } catch (err) {
    console.error('退出失败:', err)
    // 即使请求失败，也清除本地token
    localStorage.removeItem('token')
    throw err
  }
};

/**
 * 获取用户信息
 * @param {Number} userId - 用户ID
 */
export const getUserInfo = async (userId) => {
  try {
    const res = await request.get(`/${userId}`);
    return res.data;
  } catch (err) {
    console.error('获取用户信息失败:', err);
    throw err;
  }
};