// 当前播放列表
export const playlist = state => state.playlist

// audio元素
export const audioEle = state => state.audioEle

// 当前音乐索引
export const currentIndex = state => state.currentIndex

// 当前音乐
export const currentMusic = state => {
  return state.playlist[state.currentIndex] || {}
}

// 播放状态
export const playing = state => state.playing

// 当前歌词对象
export const currentLyric = state => state.currentLyric

// 当前播放时间
export const currentTime = state => state.currentTime

// 播放方式
export const mode = state => state.mode

// 当前缓存进度
export const currentProgress = state => state.currentProgress

// 播放历史列表
export const historyList = state => state.historyList

// 网易云用户UID
export const uid = state => state.uid

// 喜欢列表
export const likeList = state => state.likeList





