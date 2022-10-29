// 统一管理项目接口的模块
// 引入二次封装的axios（带有请求、响应的拦截器）
import requests from './request'
import mockRequests from './mockAjax'

// 三级菜单的请求
export const reqgetCategoryList = () => {
  return requests({
    method: 'GET',
    url: '/product/getBaseCategoryList'
  })
}

// 获取banner --- mock的数据
export const reqGetBannerList = () => {
  return mockRequests({
    method: 'GET',
    url: '/banner'
  })
}

// 获取floor数据 --- mock的数据
export const reqFloorList = () => {
  return mockRequests({
    method: 'GET',
    url: '/floor'
  })
}

// 获取搜索模块数据
export const reqGetSearchInfo = params => {
  return requests({
    method: 'POST',
    url: '/list',
    // body参数使用 data 设置
    // query参数使用 params 设置
    // headers参数使用 headers 设置
    data: params // 搜索的内容
  })
}

// 获取产品详情信息的接口
export const reqGoodsInfo = skuId => {
  return requests({
    method: 'GET',
    url: `/item/${skuId}`
  })
}

// 将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    method: 'POST',
    url: `/cart/addToCart/${skuId}/${skuNum}`
  })
}

// 获取购物车列表数据
export const reqCartList = () => {
  return requests({
    method: 'GET',
    url: '/cart/cartList'
  })
}

// 删除购物产品
export const reqDeleteCartById = (skuId) => {
  return requests({
    method: 'DELETE',
    url: `/cart/deleteCart/${skuId}`
  })
}

// 修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => {
  return requests({
    method: 'GET',
    url: `/cart/checkCart/${skuId}/${isChecked}`
  })
}

// 获取验证码
export const reqGetCode = phone => {
  return requests({
    method: 'GET',
    url: `/user/passport/sendCode/${phone}`
  })
}

// 注册
export const reqUserRegister = data => {
  return requests({
    method: 'POST',
    url: '/user/passport/register',
    data
  })
}

// 登录
export const reqUserLogin = data => {
  return requests({
    method: 'POST',
    url: '/user/passport/login',
    data
  })
}

// 获取用户信息【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = () => {
  return requests({
    method: 'GET',
    url: '/user/passport/auth/getUserInfo'
  })
}

// 退出登录
export const reqLogout = () => {
  return requests({
    method: 'GET',
    url: '/user/passport/logout'
  })
}

// 获取用户地址信息
export const reqAddressInfo = () => {
  return requests({
    method: 'GET',
    url: '/user/userAddress/auth/findUserAddressList'
  })
}

// 获取商品清单
export const reqOrderInfo = () => {
  return requests({
    method: 'GET',
    url: '/order/auth/trade'
  })
}

// 提交订单的接口
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    method: 'POST',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data
  })
}

// 获取支付信息
export const reqPayInfo = orderId => {
  return requests({
    method: 'GET',
    url: `/payment/weixin/createNative/${orderId}`
  })
}

// 获取支付订单状态
export const reqPayStatus = orderId => {
  return requests({
    method: 'GET',
    url: `/payment/weixin/queryPayStatus/${orderId}`
  })
}

// 获取支付订单状态
export const reqMyOrderList = (page, limit) => {
  return requests({
    method: 'GET',
    url: `/order/auth/${page}/${limit}`
  })
}
