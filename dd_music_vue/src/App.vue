<template>
  <div id="app">
    <router-view />

    <!--播放器-->
    <audio ref="ddPlayer"></audio>
  </div>
</template>

<script>
import { createTopList } from '@/utils/song'
import { mapMutations, mapActions } from 'vuex'
import http from '@/api/http'
import apis from '@/api'
export default {
  name: 'app',
  created() {
  	// 设置audio元素
    this.$nextTick(() => {
      this.setAudioele(this.$refs.ddPlayer)
    })
    this.getSongList()
  },
  methods: {
  	// 获取歌曲列表
  	async getSongList() {
  		let param = {
	  		idx: '1'
	  	}
	    let {data} = await http.get({
	      api: apis.top_list,
	      param: param
	    }) || ''
	    data = data.body.playlist.tracks.slice(0,100)
	  	let list = await this._formatSongs(data)
	  	this.setPlaylist(list)
  	},
		// 歌曲数据处理
    _formatSongs(list) {
      let ret = []
      list.forEach(item => {
        const musicData = item
        if (musicData.id) {
          ret.push(createTopList(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setAudioele: 'SET_AUDIOELE'
    }),
    ...mapActions(['setPlaylist'])
  }
}
</script>

<style lang="less" scoped="scoped">
	@import url("./styles/index.less");
	#app{
		position: relative;
	  width: 100%;
	  // height: auto;
	  font-size: @font_size_14;
	  color: @text_color_06;
	}
</style>
