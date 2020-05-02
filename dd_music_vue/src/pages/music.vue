<template>
  <div class="music_page">
    <dd-header></dd-header>

    <div class="all_page">
    	<router-view class="item_page" wechat-title></router-view>
			<div class="music_lyric">
				<dd-lyric
					:lyric="lyric"
	        :nolyric="nolyric"
	        :lyric-index="lyricIndex"
	      ></dd-lyric>
			</div>
    </div>

		<div :class="{ disable: !currentMusic.id }" style="padding: 0 .4rem;
      position: fixed;box-sizing: border-box;
      bottom: 0;
      width: 100%;">
			<dd-progress></dd-progress>
			<dd-bottom :volume="volume" @volumeChange="volumeChange"></dd-bottom>
		</div>

    <!--背景设置-->
		<div class="dd_bg_pic" :style="{ backgroundImage: picUrl }"></div>
    <div class="dd_bg_mask"></div>
  </div>
</template>
<script>
import http from '@/api/http'
import apis from '@/api'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import ddHeader from './components/ddHeader.vue'
import ddProgress from './components/ddProgress.vue'
import ddBottom from './components/ddBottom.vue'
import ddLyric from './components/ddLyric.vue'
import ddPlayerMusic from './ddPlayer.js'
import { silencePromise, parseLyric } from '@/utils/util'
import { getVolume, setVolume } from '@/utils/history'
export default {
  components: {
  	ddHeader, ddProgress, ddBottom, ddLyric
  },

  data () {
  	const volume = getVolume()
    return {
    	lyric: [], // 歌词
      nolyric: false, // 是否有歌词
      lyricIndex: 0, // 当前播放歌词下标
      isMute: false, // 是否静音
      volume // 音量
    }
  },

  computed: {
  	picUrl() {
      return this.currentMusic.id && this.currentMusic.image
        ? `url(${this.currentMusic.image}?param=300y300)`
        : `url('../../static/img/tu5.jpg')`
    },

    ...mapGetters([
      'audioEle', // 音乐播放器
      'playing', // 播放状态
      'playlist', // 当前播放列表
      'currentIndex', // 当前播放音乐的索引
      'currentMusic', // 当前播放音乐
      'historyList', // 历史记录
			'mode', // 播放模式
			'currentTime',
    ])
  },

  watch: {
  	currentMusic(newMusic, oldMusic) { // 监听当前播放音乐
      if (!newMusic.id) {
      	this.lyric = []
        return
      }
      if (newMusic.id === oldMusic.id) {
        return
      }
      this.audioEle.src = newMusic.url
      // 重置相关参数
      this.lyricIndex = 0
      this.setCurrentprogress(0)
      silencePromise(this.audioEle.play())
      this.$nextTick(() => {
        this._getLyric(newMusic.id)
      })
    },

    playing(newPlaying) { // 监听播放暂停
      const audio = this.audioEle
      this.$nextTick(() => {
        newPlaying ? silencePromise(audio.play()) : audio.pause()
      })
    },

    currentTime(newTime) { // 监听当前播放时间
      if (this.nolyric) {
        return
      }
      let lyricIndex = 0
      for (let i = 0; i < this.lyric.length; i++) {
        if (newTime > this.lyric[i].time) {
          lyricIndex = i
        }
      }
      this.lyricIndex = lyricIndex
    }
  },

  mounted () {
  	this.$nextTick(() => {
      ddPlayerMusic.initAudio(this)
      this.volumeChange(this.volume)
    })
  },
  methods: {
  	nextSong() { // 下一曲
    	if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
        this.loop()
      } else {
      	let index = ''
      	if (this.mode === 'listLoop') { // 列表循环
      		index = this.currentIndex + 1
	        if (index === this.playlist.length) {
	          index = 0
	        }
      	} else if (this.mode === 'random') { // 随机播放
      		index = Math.floor(Math.random() * (this.playlist.length))
      	}
        if (!this.playing) { // 暂停状态
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
      }
    },

    pause() { // 暂停
			this.setPlaying(!this.playing)
    },

    loop() { // 循环，再次播放本歌曲
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
      if (this.lyric.length > 0) {
        this.lyricIndex = 0
      }
    },

    async _getLyric(id) { // 获取歌词
    	let param = {
	  		id
	  	}
	    let {data} = await http.get({
	      api: apis.music_lyric,
	      param: param
	    }) || ''
	    if (data.body.nolyric) {
	    	this.nolyric = true
	    } else {
	    	this.nolyric = false
        this.lyric = parseLyric(data.body.lrc.lyric)
	    }
	    silencePromise(this.audioEle.play())
    },

    // 修改音量大小
    volumeChange(percent) {
    	percent === 0 ? (this.isMute = true) : (this.isMute = false)
      this.volume = percent
      this.audioEle.volume = percent
      setVolume(percent)
    },

    ...mapMutations({
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurrenttime: 'SET_CURRENTTIME',
      setCurrentprogress: 'SET_CURRENTPROGRESS',
    }),

    ...mapActions(['setHistory'])
  }
}
</script>

<style scoped="scoped" lang="less">
@import url("../styles/index.less");
	.disable {
    pointer-events: none; /*阻止用户的点击动作产生任何效果*/
    opacity: 0.6;
  }
	.music_page{
		height: 100%;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
		.all_page{
      position: fixed;
      top: 0.7rem;
      left: 0;
      right: 0;
      bottom: 1.6rem;
			flex: 1;
			display: flex;
			justify-content: space-between;
      padding: .4rem 0 0 .2rem;
      box-sizing: border-box;
			.item_page{
				flex: 1;
			}
			.music_lyric{
				width: 350px;
				position: relative;
			}
		}
	}

	/*当屏幕小于960时*/
  @media (max-width: 960px) {
    .music_lyric {
      display: none;
    }
  }

	/*背景*/
	.dd_bg_pic{
		z-index: -2;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50%;
		filter: blur(7px);
		-webkit-filter: blur(7px);
		opacity: .7;
		transition: all 0.8s;
		-webkit-transition: all 0.8s;
	}
	.dd_bg_pic, .dd_bg_mask{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.dd_bg_mask{
		z-index: -1;
		background-color: @dd_bg_mask;
	}
</style>
