import * as types from './mutation-types'

const mutations = {
  // 当前播放列表
  [types.SET_PLAYLIST](state, playlist) {
    state.playlist = playlist
  },

  // 修改audio元素
  [types.SET_AUDIOELE](state, audioEle) {
    state.audioEle = audioEle
  },

  // 修改当前音乐索引
  [types.SET_CURRENTINDEX](state, currentIndex) {
    state.currentIndex = currentIndex
  },

  // 修改播放状态
  [types.SET_PLAYING](state, playing) {
    state.playing = playing
  },

  // 修改当前歌词对象
  [types.SET_CURRENTLYRIC](state, currentLyric) {
    state.currentLyric = currentLyric
  },

  // 当前播放时间
  [types.SET_CURRENTTIME](state, currentTime) {
    state.currentTime = currentTime
  },

  // 修改播放模式播放方式
  [types.SET_MODE](state, mode) {
    state.mode = mode
  },

  // 当前缓存进度
  [types.SET_CURRENTPROGRESS](state, currentProgress) {
    state.currentProgress = currentProgress
  },

  // 修改播放历史列表
  [types.SET_HISTORYLIST](state, historyList) {
    state.historyList = historyList
  },

  // 修改网易云用户UID
  [types.SET_UID](state, uid) {
    state.uid = uid
  },

  // 喜欢列表
  [types.SET_LIKELIST](state, likeList) {
    state.likeList = likeList
  },
}

export default mutations
