// 二次封装axios
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 设置基础路径
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
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
