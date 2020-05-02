<template>
	<div class="list_page">
		<div style="text-align: center;">
			<input type="text" class="search_inp" @keyup.enter="onEnter(page=1)" v-model="keywords" />
		</div>
		<!--搜索结果-->
		<dd-list :list="list" @pullUp="pullUpLoad"></dd-list>
	</div>
</template>

<script>
import ddList from './components/ddList.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import formatSongs from '@/utils/song'
import http from '@/api/http'
import apis from '@/api'
export default {
	components: {
		ddList
	},

	data() {
		return {
			list: [],
			keywords: '',
			page: 1
		}
	},

	mounted() {
	},

	methods: {
		async onEnter() {
			let param = {
				keywords: this.keywords,
				limit: 30,
				offset: (this.page - 1) * 30
			}
			let {data} = await http.get({
	      api: apis.search,
	      param
	    }) || ''
	    if (!data.body.result.songs) {
        alert('没有更多数据啦')
        return
      }
	    if (this.page != 1) {
	    	this.list = [...this.list, ...formatSongs(data.body.result.songs)]
	    } else {
	    	this.list = formatSongs(data.body.result.songs)
	    }
		},

		pullUpLoad() {
			this.page += 1
			this.onEnter()
		}
	}
}
</script>

<style scoped="scoped" lang="less">
@import url("../styles/index.less");
.list_page{
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	.list-page{
		height: 95%;
	}
}
.search_inp{
	border: none;
	outline: none;
	width: 60%;
	height: .7rem;
	line-height: .7rem;
	border-radius: .7rem;
	text-align: center;
	color: @text_color_06;
	background-color: rgba(0,0,0, 0.2);
}
</style>