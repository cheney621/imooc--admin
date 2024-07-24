// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

// 设置基础路径
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use((config) => {
  // 添加 icode
  config.headers.icode = 'F95F9B5DF6732F51'
  // 统一注入token,以验证身份获取用户信息
  if (store.getters.token) {
    // 如果token存在，注入token
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  // 必须返回 config
  return config
})
// 响应拦截器
service.interceptors.response.use(
  // 接口文档中响应数据
  /*{
      "success": true,
      "code": 10000,
      "data": {
          "token": "Bearer d8c6ed7a-3fd4-46e4-a477-b20d1ce9cda0"
      },
      "message": "执行成功"
  }*/

  // 请求成功
  (response) => {
    const { success, message, data } = response.data
    // 请求成功操作
    if (success) {
      return data
    } else {
      // 请求成功，但业务失败（用户名密码错误等）
      ElMessage.error(message) //在页面上提示错误信息
      return Promise.reject(new Error(message))
      //它会返回一个状态为拒绝（rejected）的 Promise，并带有一个新的错误对象，其中包含传入的错误消息。
    }
  },
  // 请求失败
  (error) => {
    ElMessage.error(error.message) //提示错误信息
    return Promise.reject(error)
  }
)
export default service
