import axios from 'axios'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: 'http://localhost:9080/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Accept': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    console.log('发送请求:', config.url, config.data)
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  error => {
    console.error('请求配置错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 0) {
      return res.data // 成功时返回数据
    } else {
      message.error(res.message)
      console.log(res.message || '操作失败')
    }
  },
  error => {
    const msg = error.response?.data?.msg || 
               error.message || 
               '请求异常'
    console.log.error(msg)
    return Promise.reject(error)
  }
)

export default request