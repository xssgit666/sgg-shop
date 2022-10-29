import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客身份模块uuid--->生成一个随机字符串
import { getUUID } from '@/utils/uuidToken'

export default {
  // 开启命名空间
  namespaced: true,

  state: {
    goodInfo: {},
    uuidToken: getUUID() // 游客临时身份,只生成这一次
  },

  actions: {
    // 获取产品信息
    async getGoodInfo (context, skuId) {
      const result = await reqGoodsInfo(skuId)
      if (result.code === 200) {
        context.commit('GETGOODINFO', result.data)
      }
    },

    // 加入购物车的 || 修改某一个产品的个数
    // context可以不用，但必须写上
    async addOrUpdateShopCart (context, { skuId, skuNum }) {
      // 发请求存储成功了，没有给返回数据
      const result = await reqAddOrUpdateShopCart(skuId, skuNum)
      if (result.code === 200) {
        // 返回的是成功的标记
        return 'ok'
      } else {
        // 返回的是失败的标记
        return Promise.reject(new Error('faile'))
      }
    }
  },

  mutations: {
    GETGOODINFO (state, goodInfo) {
      state.goodInfo = goodInfo
    }
  },

  getters: {
    categoryView (state) {
    // 当前计算出的 categoryView属性值至少是一个空对象
      return state.goodInfo.categoryView || {} // 假的报错不会有
    },
    // 简化产品信息的数据
    skuInfo (state) {
      return state.goodInfo.skuInfo || {}
    },
    // 产品售卖属性的简化
    spuSaleAttrList (state) {
      return state.goodInfo.spuSaleAttrList || []
    }
  }
}
