<template>
	<div class="bott_btn">
		<div class="bott_pic">
			<div @click="toPlayPage" style="position: relative;">
				<img :src="currentMusic.image || '../../../static/img/tu5.jpg'" />
				<div :class="[{xuanzhuan: $router.currentRoute.name == 'music_paly'}, 'toppage']">
					<img src="../../../static/img/topPage.png" />
				</div>
			</div>
			<div v-if="currentMusic.id" class="botnam">
				{{currentMusic.singer}} - {{currentMusic.name}}<br />
				<span>
					{{ currentTime | format }}/{{ currentMusic.duration % 3600 | format }}
				</span>
			</div>
		</div>
		<div style="text-align: center;">
			<img src="../../../static/img/preS.png" title="上一首" class="bott_pre" @click="pre()" />
			<img :src="playing ? '../../../static/img/playy.png' : '../../../static/img/playyy.png'" title="播放暂停" class="bott_paly" @click="pause()" />
  		<img src="../../../static/img/nextS.png" title="下一首" class="bott_next" @click="nextf()" />
		</div>
		<div class="bott_right">
			<img :src="isMute ? '../../../static/img/voice_dis.png' : '../../../static/img/voice.png'" title="静音" class="bott_voice" @click="handleToggleVolume" />
			<dd-volume class="voice_gress"
				title="音量"
				:percent="volumeProgress"
        @percentChange="handleVolumeChange"
			></dd-volume>

			<img :src="`../../../static/img/play_${mode}.png`" class="bott_mode" title="播放模式" @click="chooseMode()" />

			<div class="playMode" v-if="showMode == true">
				<div v-for="mm in modeList" :class="{'onActive' : mode == mm.modeCode}" :title="mm.modeName" @click="ensureMode(mm)">
					{{mm.modeName}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { silencePromise } from '@/utils/util'
import { format } from '../../utils/util'
import ddVolume from './ddVolume.vue'
export default {
	props: {
		volume: ''
	},
	data() {
		return {
			modeList: [
				{modeName: '顺序播放', modeCode: 'listLoop'},
				{modeName: '单曲循环', modeCode: 'loop'},
				{modeName: '随机播放', modeCode: 'random'}
			],
			showMode: false,
		}
	},
	components: {
		ddVolume
	},
	computed: {
		volumeProgress() {
      return this.volume
    },

		isMute: {
      get() {
        return this.volumeProgress === 0
      },
      set(newMute) {
        const volume = newMute ? 0 : this.lastVolume
        if (newMute) {
          this.lastVolume = this.volumeProgress
        }
        this.handleVolumeChange(volume)
      }
   },

		...mapGetters([
      'currentMusic',
      'currentTime',
      'playlist',
      'currentIndex',
      'playing',
      'audioEle',
      'mode'
    ])
	},
	filters: {
    // 时间格式化
    format
  },
  methods: {
  	nextf() { // 下一首
  		if (this.currentMusic.id == undefined) {
  			return
  		}
  		if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
        this.loop()
      } else {
     	  let index = this.currentIndex + 1
        if (index === this.playlist.length) {
          index = 0
        }
        if (!this.playing) { // 暂停状态
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
      }
  	},

  	pause() { // 播放暂停
  		if (this.currentMusic.id == undefined) { //当前没有正在播放的音乐，底部按钮不可点击
  			return
  		}
			this.setPlaying(!this.playing)
  	},

  	pre() { // 上一首
  		if (this.currentMusic.id == undefined) {
  			return
  		}
  		if (this.playlist.length === 1) { // 播放列表只有一首歌曲，循环播放
  			this.loop()
  		} else {
  			let index = this.currentIndex - 1
        if (index < 0) {
          index = this.playlist.length - 1
        }
        if (!this.playing) { // 暂停状态
          this.setPlaying(true)
        }
        this.setCurrentIndex(index)
  		}
  	},

  	loop() { // 循环
      this.audioEle.currentTime = 0
      silencePromise(this.audioEle.play())
      this.setPlaying(true)
    },

    chooseMode() { // 选择播放方式弹框
    	this.showMode = !this.showMode
    },

    ensureMode(item) { // 选择播放方式
			this.setMode(item.modeCode)
    },

    handleVolumeChange(percent) { // 音量控制
    	this.$emit('volumeChange', percent)
    },

    handleToggleVolume() { // 是否静音
      this.isMute = !this.isMute
    },

  	toPlayPage() {
//		if (this.$router.currentRoute.name == 'music_paly') {
//			history.go(-1)
//		} else {
//			this.$router.push({
//	  			path: '/music_paly'
//	  		})
//		}
  	},

  	...mapMutations({
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENTINDEX',
    }),

    ...mapActions(['setMode'])
  }
}
</script>

<style scoped="scoped" lang="less">
@import url("../../styles/index.less");
	.bott_btn{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: .1rem;
	}
	.bott_pic{
		display: flex;
		align-items: center;
		width: 40%;
		.xuanzhuan img{
			transform: rotate(180deg)
		}
		img{
			border-radius: .1rem;
			width: 1rem;
			height: 1rem;
			transition:all .2s ease-in-out
		}
		.toppage{
			position: absolute;
			border-radius: .1rem;
			width: 1rem;
			height: 1rem;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: .5rem;
				height: .5rem;
			}
		}
		.toppage{
			opacity: 0;
			transition:all .3s ease-in-out
		}
		.toppage:hover{
			opacity: 1;
		}
		.botnam{
			padding-left: .2rem;
		}
	}
	.bott_pre, .bott_paly, .bott_next, .bott_mode{
		width: .5rem;
		height: .5rem;
		cursor:pointer;
	}

	.playMode{
		position: absolute;
		display: flex;
		flex-flow: column;
		bottom: .7rem;
		right: -.3rem;
		border-radius: .05rem;
		background: @dd_bg_mode;
		div{
			height: .5rem;
			line-height: .5rem;
			padding: 0 .2rem;
			cursor:pointer;
		}
		.onActive{
			background: @dd_bg_mode_active;
			color: @text_color_active;
		}
	}
	.bott_voice{
		width: .5rem;
		height: .5rem;
		cursor:pointer;
	}
	.bott_right{
		width: 40%;
		position: relative;
		display: flex;
		justify-content: flex-end;
		.voice_gress{
			flex: 1;
			max-width: 2rem;
			display: flex;
			align-items: center;
			margin: 0 .8rem 0 .2rem;
		}
	}
</style>