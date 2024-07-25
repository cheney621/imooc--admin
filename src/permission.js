import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 要到那里去
 * @param {*} from 从哪来
 * @param {*} to 是否要去
 */
/**
 * 登录鉴权
 * 1.用户已登录——不允许进入login
 * 2.用户未登录——只允许进入login
 */
router.beforeEach(async (to, from, next) => {
  if (store.getters.token) {
    // token存在，则进入主页
    // 快捷访问
    if (to.path === 'login') {
      next('/') //进入login路径自动跳转到layout页面
    } else {
      // 判断用户资料是否获取
      // 若不存在用户信息，则需要获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action
        await store.dispatch('user/getUserInfo')
      }
      next() //进入的不是login，则正常的跳转
    }
  } else {
    // 没有token，进入白名单（login页面、404页面等）
    if (whiteList.indexOf(to.path) > -1) {
      next() //路径>-1表示在白名单中，则直接通过
    } else {
      next('/login') //不在白名单中，只能进入login
    }
  }
})
