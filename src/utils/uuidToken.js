import { v4 as uuidv4 } from 'uuid'
// 要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
  // 先从本地存储获取uuid
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  // 如果没有
  if (!uuidToken) {
    // 生成游客临时身份
    uuidToken = uuidv4()
    // 本地存储存储一次
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  // 返回
  return uuidToken
}
