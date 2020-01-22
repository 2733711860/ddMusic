import { getHistoryList, getUserId } from '@/utils/history'

const state = {
  audioEle: null, // audio元素
  playlist: [], // 当前播放列表
  currentIndex: -1, // 当前音乐索引
  playing: false, // 播放状态
  currentTime: 0, // 当前播放时间
  currentProgress: 0, // 当前缓存进度
  mode: 'listLoop', // 播放模式，默认顺序播放。listLoop：顺序播放；loop：单曲循环；random：随机播放。
	historyList: getHistoryList() || [], // 播放历史列表
  currentLyric: {}, // 当前歌词对象
  uid: getUserId() || null, // 网易云用户UID
  likeList: [] // 喜欢列表
}

export default state
