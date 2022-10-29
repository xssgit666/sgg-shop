// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入store
import store from '@/store'

// 创建axios实例
const requests = axios.create({
  // 基础路径
  baseURL: '/api',
  // 请求不能超过5s
  timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use(function (config) {
  // 未登录添加一个游客id
  if (store.state.detail.uuidToken) {
    // 请求头添加一个字段(游客：userTempId)
    config.headers.userTempId = store.state.detail.uuidToken
  }

  // 若登陆，需要携带token带给服务器方可
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }

  // 进度条开始
  nprogress.start()

  // config即请求头信息
  return config
})

// 响应拦截器
requests.interceptors.response.use(function (response) {
  // 进度条结束
  nprogress.done()

  return response.data // 请求成功的回调
}, function (error) {
  // 请求失败的回调
  return Promise.reject(error)
})

export default requests
