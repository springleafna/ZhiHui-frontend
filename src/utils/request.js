import axios from 'axios'
import { message } from 'ant-design-vue'

// 创建 axios 实例
const service = axios.create({
  baseURL: 'localhost:9090/api', // API 的基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    // 处理请求错误
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    // 这里根据后端的数据结构进行调整
    if (res.code === 0) {  // code === 0 表示成功
      return res.data
    } else {
      // code === 1 表示失败
      message.error(res.message || '请求失败')
      // 如果是未登录或token过期的情况
      if (res.message && res.message.includes('token')) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  error => {
    // 处理 HTTP 错误状态
    let errorMessage = '请求失败'
    if (error.response) {
      switch (error.response.status) {
        case 400:
          errorMessage = '请求错误'
          break
        case 401:
          errorMessage = '未授权，请登录'
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          errorMessage = '拒绝访问'
          break
        case 404:
          errorMessage = '请求地址不存在'
          break
        case 408:
          errorMessage = '请求超时'
          break
        case 500:
          errorMessage = '服务器内部错误'
          break
        case 501:
          errorMessage = '服务未实现'
          break
        case 502:
          errorMessage = '网关错误'
          break
        case 503:
          errorMessage = '服务不可用'
          break
        case 504:
          errorMessage = '网关超时'
          break
        case 505:
          errorMessage = 'HTTP版本不受支持'
          break
        default:
          errorMessage = `连接错误${error.response.status}`
      }
    } else if (error.message.includes('timeout')) {
      errorMessage = '请求超时'
    }
    message.error(errorMessage)
    return Promise.reject(error)
  }
)

export default service