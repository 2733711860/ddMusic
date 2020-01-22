<template>
	<div class="list_page">
		<!--当前列表-->
		<dd-list :list="list"></dd-list>
	</div>
</template>

<script>
import ddList from './components/ddList.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatTopSongs } from '@/utils/song'
import http from '@/api/http'
import apis from '@/api'
export default {
	components: {
		ddList
	},

	data() {
		return {
			list: []
		}
	},

	mounted() {
		this.init()
	},

	methods: {
		async init() {
			let param = { id: this.$route.query.sheetId }
			let {data} = await http.get({
	      api: apis.sheet_detail,
	      param
	    }) || ''
	    this.list = await formatTopSongs(data.body.playlist.tracks)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	height: 100%;
}
</style>