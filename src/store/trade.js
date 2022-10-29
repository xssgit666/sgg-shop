import { reqAddressInfo, reqOrderInfo } from '@/api'

export default {
  namespaced: true,

  state: {
    address: [], // 用户地址信息
    orderInfo: {} // 商品清单数据
  },

  actions: {
    // 获取用户地址信息
    async getUserAddress ({ commit }) {
      const result = await reqAddressInfo()
      if (result.code === 200) {
        commit('GETUSERADDRESS', result.data)
      }
    },

    // 获取商品清单数据
    async getOrderInfo ({ commit }) {
      const result = await reqOrderInfo()
      if (result.code === 200) {
        commit('GETORDERINFO', result.data)
      }
    }
  },

  mutations: {
    GETUSERADDRESS (state, address) {
      state.address = address
    },

    GETORDERINFO (state, orderInfo) {
      state.orderInfo = orderInfo
    }
  },

  getters: {}
}
