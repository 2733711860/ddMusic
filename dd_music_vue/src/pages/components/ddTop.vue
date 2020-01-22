<template>
	<div>
		<div :class="[{ddtop_show: showTopp}, 'ddtop']">
			<span class="ddTop_item" v-for="item in list" @click="toPage(item)">{{item.name}}</span>
		</div>
		<div class="bg_bg" @click="closeTop" v-show="showTopp"></div>
	</div>
</template>

<script>
export default{
	data() {
		return{
			showTopp: '',
			list: [
				{ name: '播放列表', path: '/music_listPage' },
				{ name: '精选歌单', path: '/music_sheet' },
				{ name: '排行榜单', path: '/music_rank' },
				{ name: '歌曲搜索', path: '/music_search' },
				{ name: '喜欢列表', path: '/music_like' },
				{ name: '播放历史', path: '/music_history' },
				{ name: '用户中心', path: '/music_user' },
			]
		}
	},
	props: {
		showTop: ''
	},
	watch: {
		showTop() {
			this.showTopp = this.showTop
		}
	},

	methods: {
		closeTop() {
			this.$emit('closeTop')
		},

		toPage(item) {
			this.closeTop()
			if (this.$route.path != item.path) {
				this.$router.push({
					path: item.path
				})
			}
		}
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url("../../styles/index.less");
	.ddtop{
		height: 0;
		position: absolute;
		overflow: hidden;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background-color: @dd_bg_mode_05;
		transition: all .2s;
	}
	.ddtop_show{
		height: 2rem;
		line-height: 2rem;
		padding: 0 .4rem;
	}
	.bg_bg{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		background: @dd_bg_mask;
	}
	.ddTop_item{
		display: inline-block;
		height: .5rem;
		line-height: .5rem;
		padding: 0 .2rem;
		margin: .2rem;
		border-radius: .1rem;
		border: 1px solid hsla(0,0%,100%,.4);
		cursor: pointer;
	}
	.ddTop_item:hover{
		color: @text_color_active;
		border: 1px solid hsla(0,0%,100%,.9);
	}
</style>