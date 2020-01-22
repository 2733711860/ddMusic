<template>
	<div class="list_page">
		<!--我喜欢的列表-->
		<dd-list :list="list" @likeit="init"></dd-list>

		<dd-msg-box :showLogin="showLogin" @closeLogin="closeLogin" v-if="list.length==0"></dd-msg-box>
	</div>
</template>

<script>
import ddList from './components/ddList.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { formatLikeSongs } from '@/utils/song'
import ddMsgBox from './components/ddMsgBox.vue'
import http from '@/api/http'
import apis from '@/api'
export default {
	components: {
		ddList, ddMsgBox
	},

	data() {
		return {
			list: [],
			showLogin: false
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

	mounted() {
		if (this.uid == null) {
			this.showLogin = true
		} else {
			this.init()
		}
	},

	methods: {
		closeLogin() {
			this.showLogin = false
		},

		async init() {
			let param = { uid: this.uid }
			let {data} = await http.get({
	      api: apis.like_search,
	      param
	    }) || ''
	    this.list = await formatLikeSongs(data.data || [])
	    this.setLikeList(this.list)
		},

		...mapActions(['setLikeList'])
	}
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	height: 100%;
}
</style>