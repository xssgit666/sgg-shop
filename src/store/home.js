import {
  reqgetCategoryList,
  reqGetBannerList,
  reqFloorList
} from '@/api'

export default {
  namespaced: true, // 开启命名空间

  state: {
    categoryList: [], // 分类列表
    bannerList: [], // 轮播图的数据
    floorList: [] // floor组件的数据
  },

  actions: {
    // 请求分类列表
    async categoryList (context) {
      const res = await reqgetCategoryList()
      if (res.code === 200) {
        context.commit('CATEGORYLIST', res.data)
      }
    },

    // 获取首页轮播图的数据
    async getBannerList (context) {
      const result = await reqGetBannerList()
      if (result.code === 200) {
        context.commit('GETBANNERLIST', result.data)
      }
    },

    // 获取floor数据
    async getFloorList ({ commit }) {
      const result = await reqFloorList()
      if (result.code === 200) {
        commit('GETFLOORLIST', result.data)
      }
    }
  },

  mutations: {
    // 请求来的列表存入state
    CATEGORYLIST (state, categoryList) {
      state.categoryList = categoryList
    },

    // 获取首页轮播图的数据
    GETBANNERLIST (state, bannerList) {
      state.bannerList = bannerList
    },

    // 获取首页轮播图的数据
    GETFLOORLIST (state, floorList) {
      state.floorList = floorList
    }
  },

  getters: {}
}
