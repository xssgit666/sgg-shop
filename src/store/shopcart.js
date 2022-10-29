import {
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedByid
} from '@/api'
export default {
  namespaced: true,

  state: {
    cartList: [] // 购物车数据
  },

  actions: {
    // 获取购物车数据
    async getCartList (context) {
      const res = await reqCartList()
      if (res.code === 200) {
        context.commit('GETCARTLIST', res.data)
      }
    },

    // 删除购物车某一个产品
    async deleteCartListBySkuId (context, skuId) {
      const res = await reqDeleteCartById(skuId)
      if (res.code === 200) {
        return 'OK'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    // 修改产品状态
    async updateCheckedById (context, { skuId, isChecked }) {
      const res = await reqUpdateCheckedByid(skuId, isChecked)
      if (res.code === 200) {
        return 'ok'
      } else {
        return Promise.reject(new Error('faile'))
      }
    },

    // 删除全部勾选的产品
    deleteAllCheckedCart (context) {
      context.getters.cartList.cartInfoList.forEach((item) => {
        if (item.isChecked === 1) {
          context.dispatch('deleteCartListBySkuId', item.skuId)
        }
      })
    },

    // 修改全部产品的状态
    updateAllCartIsChecked (context, isChecked) {
      context.getters.cartList.cartInfoList.forEach((item) => {
        context.dispatch('updateCheckedById', {
          skuId: item.skuId,
          isChecked
        })
      })
    }
  },

  mutations: {
    // 购物车数据更新state
    GETCARTLIST (state, cartList) {
      state.cartList = cartList
    }
  },

  getters: {
    cartList (state) {
      // 当后台返回的购物车数据为空时，cartInfoList 就会为undefined，会导致后面的total、isAllCheck等计算属性使用到cartInfoList时产生计算错误
      return state.cartList[0] || {}
    }
  }
}
