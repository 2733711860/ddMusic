<template>
	<div>
		<dd-sheet-list :list="sheetList" :name="`用户${uid}的歌单`" @godetail="godetail"></dd-sheet-list>

		<dd-msg-box :showLogin="showLogin" @closeLogin="closeLogin" v-if="sheetList.length==0"></dd-msg-box>
	</div>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
import ddSheetList from './components/ddSheetList.vue'
import ddMsgBox from './components/ddMsgBox.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
	components: {
		ddSheetList, ddMsgBox
	},

	data () {
		return{
			sheetList: [],
			showLogin: false, // 是否显示登陆组件
		}
	},

	mounted () {
		if (this.uid == null) {
			this.showLogin = true
		} else {
			this.init()
		}
	},

	computed: {
		...mapGetters(['uid'])
	},

	watch: {
		uid(newUid) {
			if (newUid == null) {
				this.showLogin = true
			} else {
				this.init()
			}
		}
	},

	methods: {
		async init() { // 获取用户歌单
			let param = { uid: this.uid }
			let {data} = await http.get({
	      api: apis.sheet_user,
	      param: param
	    }) || ''
	    this.sheetList = data.body.playlist
		},

		godetail(item) { // 跳转页面
			this.$router.push({
				path: '/music_songList',
				query: {
					sheetId: item.id
				}
			})
		},

		closeLogin() {
			this.showLogin = false
		},
	}
}
</script>

<style>
</style>