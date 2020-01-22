import * as types from './mutation-types'
import { setHistoryList, removeHistoryList, clearHistoryList, setUserId } from '@/utils/history.js'

// 动画方向
export const setDirection = function({ commit }, direction) {
  commit(types.SET_DIRECTION, direction)
}

// 当前播放列表
export const setPlaylist = function({ commit }, playlist) {
  commit(types.SET_PLAYLIST, playlist)
}

// 当前歌词对象
export const setCurrentlyric = function({ commit }, currentLyric) {
  commit(types.SET_CURRENTLYRIC, currentLyric)
}

// 设置播放模式
export const setMode = function({ commit }, mode) {
  commit(types.SET_MODE, mode)
}

// 选择播放（会更新整个播放列表）
export const selectPlay = function({ commit }, { list, index }) {
  commit(types.SET_PLAYLIST, list) // 更新播放列表
  commit(types.SET_CURRENTINDEX, index) // 当前播放音乐索引更新
  commit(types.SET_PLAYING, true) //更新播放状态
}

// 设置播放历史
export const setHistory = function({ commit }, music) {
	commit(types.SET_HISTORYLIST, setHistoryList(music))
}

// 删除播放历史
export const removeHistory = function({ commit }, music) {
  commit(types.SET_HISTORYLIST, removeHistoryList(music))
}

// 清空播放历史
export const clearHistory = function({ commit }) {
  commit(types.SET_HISTORYLIST, clearHistoryList())
}

// 设置网易云用户UID
export const setUid = function({ commit }, uid) {
  commit(types.SET_UID, setUserId(uid))
}

// 喜欢列表
export const setLikeList = function({ commit }, likeList) {
  commit(types.SET_LIKELIST, likeList)
}