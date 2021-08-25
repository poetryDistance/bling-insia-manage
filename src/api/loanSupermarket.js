import store from '@/store'

// 市场管理接口
import request from '@/utils/request'

/**
 * 获取市场名称
 */
export function getMarketNameList(params) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'loan/getMarketNameList',
    method: 'get',
    params
  })
}

/**
 * 产品列表 -- 获取列表
 */
export function getProductList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/productList',
    method: 'post',
    data
  })
}

/**
 * 产品列表 -- 添加产品
 */
export function addProduct(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/addProduct',
    method: 'post',
    data
  })
}

/**
 * 产品列表 -- 修改产品
 */
export function updateProduct(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/updateProduct',
    method: 'post',
    data
  })
}

/**
 * 产品列表 -- 删除产品
 */
export function delProduct(params) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'product/delProduct',
    method: 'get',
    params
  })
}

/**
 * 产品规则管理 -- 获取产品名称
 */
export function getProductDown(item) {
  const params = item || {}
  if (store.getters.currentMarketId) {
    params.marketType = store.getters.currentMarketId
  }

  return request({
    url: process.env.VUE_APP_BASE_API + 'product/getProductDown',
    method: 'get',
    params
  })
}

/**
 * 产品规则管理 -- 获取列表
 */
export function getProductPrecept(item) {
  const data = item || {}
  if (store.getters.currentMarketId) {
    data.marketType = store.getters.currentMarketId
  }

  return request({
    url: process.env.VUE_APP_BASE_API + 'productPreceptManagement/getProductPrecept',
    method: 'post',
    data
  })
}

/**
 * 产品规则管理 -- 添加
 */
export function createProductPrecept(item) {
  const data = item || {}
  if (store.getters.currentMarketId) {
    data.marketType = store.getters.currentMarketId
  }

  return request({
    url: process.env.VUE_APP_BASE_API + 'productPreceptManagement/createProductPrecept',
    method: 'post',
    data
  })
}

/**
 * 产品规则管理 -- 修改
 */
export function updateProductPrecept(item) {
  const data = item || {}
  if (store.getters.currentMarketId) {
    data.marketType = store.getters.currentMarketId
  }

  return request({
    url: process.env.VUE_APP_BASE_API + 'productPreceptManagement/updateProductPrecept',
    method: 'post',
    data
  })
}

/**
 * 产品规则管理 -- 删除
 */
export function deleteProductPrecept(item) {
  const data = item || {}
  if (store.getters.currentMarketId) {
    data.marketType = store.getters.currentMarketId
  }

  return request({
    url: process.env.VUE_APP_BASE_API + 'productPreceptManagement/deleteProductPrecept',
    method: 'post',
    data
  })
}

/**
 * 市场列表 -- 获取
 */
export function getMarketList(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'loan/getMarketList',
    method: 'post',
    data
  })
}

/**
 * 市场列表 -- 添加
 */
export function addMarket(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'loan/addMarket',
    method: 'post',
    data
  })
}

/**
 * 市场列表 -- 修改
 */
export function updateMarket(data) {
  return request({
    url: process.env.VUE_APP_BASE_API + 'loan/updateMarket',
    method: 'post',
    data
  })
}
