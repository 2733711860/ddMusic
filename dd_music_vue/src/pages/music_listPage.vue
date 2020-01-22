<template>
	<div class="list_page">
		<!--当前播放列表-->
		<dd-list :list="playlist"></dd-list>
	</div>
</template>

<script>
import ddList from './components/ddList.vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
	components: {
		ddList
	},
	computed: {
		...mapGetters([
			'playlist', // 播放列表
		]),
	},
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	height: 100%;
}
</style>