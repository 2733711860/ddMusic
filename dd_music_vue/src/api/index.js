/**
 * Created by chenyb on 22/10/18.
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import config from '@/config/index.js'
let baseUrl
switch (process.env.NODE_ENV) {
  // 生产环境
  case 'production':
    baseUrl = config.baseUrl.pro
    break
  // 测试环境
  case 'testing':
    baseUrl = config.baseUrl.tes
    break
  default:
    // 开发环境
    baseUrl = config.baseUrl.dev
    break
}
export { baseUrl }
export default {
  music_lyric: baseUrl + '/music/lyric',
  top_list: baseUrl + '/top/list',
  sheet_detail: baseUrl + '/sheet/detail',
  sheet_advise: baseUrl + '/sheet/advise', // 推荐歌单
  sheet_user: baseUrl + '/sheet/user', // 用户歌单
  sheet_recommend: baseUrl + '/sheet/recommend', // 每日推荐歌单
  sheet_boutique: baseUrl + '/sheet/boutique', // 精品歌单
  search: baseUrl + '/search', // 搜索
  login_cellphone: baseUrl + '/login/cellphone', // 手机密码登陆
  like_music: baseUrl + '/like/music', // 喜欢和取消喜欢
  like_search: baseUrl + '/like/search', // 查询喜欢的歌曲
  music_detail: baseUrl + '/music/detail', // 歌曲详情
  rank_allList: baseUrl + '/rank/allList', // 获取所有榜单
  rank_topList: baseUrl + '/rank/topList', // 获取榜单列表
}
