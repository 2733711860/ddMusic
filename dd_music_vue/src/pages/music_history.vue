<template>
	<div class="list_page">
		<!--播放历史列表-->
		<dd-list :list="historyList"></dd-list>
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
			'historyList', // 播放历史列表
		]),
	},
}
</script>

<style scoped="scoped" lang="less">
.list_page{
	height: 100%;
}
</style>