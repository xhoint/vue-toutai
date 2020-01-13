// 获取文章列表
import axios from '@/utils/myaxios.js'

export const getPostList = params => {
  return axios({
    url: '/post',
    params
  })
}
// 获取文章发布
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
