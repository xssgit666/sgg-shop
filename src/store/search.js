import {
  reqGetSearchInfo
} from '@/api'

export default {
  namespaced: true,

  state: {
    searchList: {}
  },

  actions: {
    async getSearchList (context, params) {
      const result = await reqGetSearchInfo(params)
      if (result.code === 200) {
        context.commit('GETSEARCHLIST', result.data)
      }
    }
  },

  mutations: {
    GETSEARCHLIST (state, searchList) {
      state.searchList = searchList
    }
  },

  getters: {
    goodsList (state) {
      return state.searchList.goodsList || []
    },
    trademarkList (state) {
      return state.searchList.trademarkList || []
    },
    attrsList (state) {
      return state.searchList.attrsList || []
    },
    total (state) {
      return state.searchList.total || 0
    }
  }
}
