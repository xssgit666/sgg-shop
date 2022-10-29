import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout
} from '@/api'
export default {
  // 开启命名空间
  namespaced: true,

  state: {
    code: '', // 验证码
    token: localStorage.getItem('TOKEN'),
    userInfo: {} // 用户信息
  },

  actions: {
    // 获取验证码
    async getCode  (context, phone) {
      const res = await reqGetCode(phone)
      if (res.code === 200) {
        context.commit('GETCODE', res.data)
        return 'OK'
      } else {
        // return Promise.reject(new Error('faile'))
      }
    },
    // 用户注册
    async userRegister (context, user) {
      const result = await reqUserRegister(user)
      if (result.code === 200) {
        return 'ok'
      } else {
        // return Promise.reject(new Error('faile'))
      }
    },
    // 登录
    async userLogin (context, data) {
      const result = await reqUserLogin(data)
      if (result.code === 200) {
        // 用户已经登录成功且获取到token
        context.commit('USERLOGIN', result.data.token)
        // 持久化存储token
        localStorage.setItem('TOKEN', result.data.token)
        return 'OK'
      } else {
        // return Promise.reject(new Error('faile'))
      }
    },
    // 获取用户信息
    async getUserInfo (context) {
      const res = await reqUserInfo()
      if (res.code === 200) {
        context.commit('GETUSERINFO', res.data)
        return 'OK'
      } else {
        // return Promise.reject(new Error('faile'))
      }
    },
    // 退出登录
    async userLogout (context) {
      // 只是向服务器发起一次请求，通知服务器清除token
      const result = await reqLogout()
      if (result.code === 200) {
        context.commit('CLEAR')
        return 'OK'
      } else {
        // return Promise.reject(new Error('faile'))
      }
    }
  },

  mutations: {
    GETCODE (state, code) {
      state.code = code
    },

    USERLOGIN (state, token) {
      state.token = token
    },

    GETUSERINFO (state, userInfo) {
      state.userInfo = userInfo
    },

    CLEAR (state) {
      // 仓库中用户信息清空
      state.token = ''
      state.userInfo = {}
      // 本地存储数据清空
      localStorage.removeItem('TOKEN')
    }
  },

  getters: {}
}
