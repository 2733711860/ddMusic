<template>
	<div class="list_page">
		<div class="rank_top">
			<div class="rank_title">排行榜单</div>
			<div class="rank_type">
				<span v-for="item in typeList" :class="[{choosing: item.rankCode==chooseRankCode}]" :title="item.rankName" @click="findRank(item.rankCode)">{{item.rankName}}</span>
			</div>
		</div>
		<dd-list :list="list"></dd-list>
	</div>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
import ddList from './components/ddList.vue'
import { formatTopSongs } from '@/utils/song'
export default {
	data() {
		return{
			typeList: [],
			list: [],
			chooseRankCode: ''
		}
	},
	
	components: {
		ddList
	},
	
	mounted () {
		this.getRankType()
	},
	
	methods: {
		async getRankType() { // 获取排行分类
			let {data} = await http.get({
	      api: apis.rank_allList
	    }) || ''
	    this.typeList = data.rankList.filter(item=>item.rankCode=='1' || item.rankCode=='7' || item.rankCode=='0' || 
	    item.rankCode=='14' || item.rankCode=='15' || item.rankCode=='16' || item.rankCode=='17' ||
	    item.rankCode=='24' || item.rankCode=='26' || item.rankCode=='28' || item.rankCode=='30')
	    
	    this.findRank('26')
		},
		
		async findRank(rankCode) { // 具体排行榜
			this.chooseRankCode = rankCode
			let param = { idx: rankCode }
			let {data} = await http.get({
	      api: apis.rank_topList,
	      param
	    }) || ''
	    this.list = await formatTopSongs(data.body.playlist.tracks)
		}
	}
}
</script>

<style lang="less" scoped="scoped">
@import url("../styles/index.less");
	.list_page{
		height: 100%;
		display: flex;
		flex-flow: column;
		width: 100%;
		.list-page{
			height: 65%;
		}
		.rank_top{
			.rank_title{
				padding: 0 0 .3rem;
				font-size: @font_size_18;
				color: @text_color_09;
			}
			.rank_type{
				/*background: @dd_bg_mask;*/
				flex: 1;
				box-shadow: 1px 3px 10px @dd_bg_mask;
				height: 5.5rem;
				span{
					display: inline-block;
					padding: .1rem .2rem;
					margin: .15rem;
					border: 1px solid hsla(0,0%,100%,.6);
					border-radius: .1rem;
					cursor: pointer;
				}
				.choosing{
					color: @text_color_active;
					border: 1px solid hsla(0,0%,100%,.9);
				}
			}
		}
	}
</style>