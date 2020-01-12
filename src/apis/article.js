// 获取文章列表
import axios from '@/utils/myaxios.js'

export const getPostList = () => {
  return axios({
    url: '/post'
  })
}
