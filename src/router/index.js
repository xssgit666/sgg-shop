import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

// 工作的时候想处理就处理，不想处理对于程序没有任何影响
// 重写VueRouter.prototype原型对象身上的push|replace方法
// 先把VueRouter.prototype身上的push|replace方法进行保存一份
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 重写VueRouter.prototype身上的push方法
VueRouter.prototype.push = function (location, resolve, reject) {
  // 第一个形参：路由跳转的配置对象（query|params）
  // 第二个参数：undefined|箭头函数（成功的回调）
  // 第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    // push方法传递第二个参数|第三个参数（箭头函数）
    // originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject)
  } else {
    // push方法没有传递第二个参数|第三个参数
    originPush.call(this, location, () => {}, () => {})
  }
}
// 重写VueRouter.prototype身上的replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

// VueRouter类的实例
const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  }
})

// 全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  // 获取仓库中的token-----可以确定用户是否登录了
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) { // 已登录
    if (name) { // 未过期
      // 不能去登录和注册页了,去首页
      if (to.path === '/login' || to.path === '/register') {
        next('/')
      } else {
        // 拥有用户信息，放行
        next()
      }
    } else { // 已过期
      const res = await store.dispatch('user/getUserInfo')
      if (res) {
        next()
      } else {
        await store.dispatch('user/userLogout')
        alert('登录已过期，请重新登录')
        next('/login')
      }
    }
  } else { // 未登录
    // 不能去支付相关【pay|paysuccess】和个人中心
    const toPath = to.path
    if (toPath.indexOf('/trade') !== -1 || toPath.indexOf('/pay') !== -1 || toPath.indexOf('/center') !== -1) {
      // 提示一下
      alert('请先重新登录您的账号')
      // 把未登录时没有去成的信息，存储于地址栏中【路由】
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面这些路由（home|search|shopCart）--- 放行
      next()
    }
  }
})

// 对外暴露router类的实例
export default router
