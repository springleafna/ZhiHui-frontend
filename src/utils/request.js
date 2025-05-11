import axios from 'axios'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: 'http://127.0.0.1:9080/api',
  withCredentials: false, // 不需要跨域带cookie
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器 - 添加token
request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 0) {
      return res.data // 成功时返回数据
    } else {
      message.error(res.message || '操作失败')
    }
  },
  error => {
    const msg = error.response?.data?.msg || 
               error.message || 
               '请求异常'
    message.error(msg)
    return Promise.reject(error)
  }
)

export default request