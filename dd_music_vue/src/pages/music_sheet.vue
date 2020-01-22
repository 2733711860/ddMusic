<template>
	<div class="sheet_page">
		<div class="sheet_tag">
			<div>类别：</div>
			<div v-for="item in tags" :class="[{active: aname==item.catName}, 'tag_title']" @click="findThis(item)">
				{{item.catName}}
			</div>
		</div>

		<div class="tag_detail">
			<div>{{aname}}：</div>
			<div :class="[{acyive: chooseTag==item}, 'item_tag']" v-for="item in nowTagList[0].list" @click="selet(item)">{{item}}</div>
		</div>


		<dd-sheet-list :list="sheetList_china" :name="`${chooseTag}歌单`" @godetail="godetail"></dd-sheet-list>
		
		<dd-sheet-hot :list="sheetList_hot" name="热门歌单" @godetail="godetail" style="margin-top: 2rem;"></dd-sheet-hot>
	</div>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
import ddSheetList from './components/ddSheetList.vue'
import ddSheetHot from './components/ddSheetHot.vue'
export default {
	data() {
		return{
			sheetList_china: [],
			sheetList_hot: [],
			aname: '全部',
			chooseTag: '全部', // 选择的tag
			tags: [
				{
					catName: '全部',
					catList: [
						{
							name: '全部',
							list: ['全部' ]
						}
					]
				},
				{
					catName: '语言',
					catList: [
						{
							name: '语言',
							list: ['华语', '欧美', '日语', '韩语', '粤语' ]
						}
					]
				},
				{
					catName: '风格',
					catList: [
						{
							name: '风格',
							list: [ '古风', '流行','民谣', '说唱', '轻音乐', '乡村', '古典', '民族' ]
						}
					]
				},
				{
					catName: '场景',
					catList: [
						{
							name: '场景',
							list: ['清晨', '夜晚', '学习', '工作', '午休', '下午茶', '地铁', '驾车', '运动', '旅行', '散步']
						}
					]
				},
				{
					catName: '心情',
					catList: [
						{
							name: '心情',
							list: [ '怀旧', '清新', '浪漫', '伤感', '治愈', '放松', '孤独', '感动', '兴奋', '快乐', '安静', '思念']
						}
					]
				},
				{
					catName: '年龄',
					catList: [
						{
							name: '年龄',
							list: [ '儿童', '校园', '70后', '80后', '90后', '00后']
						}
					]
				},
				{
					catName: '其他',
					catList: [
						{
							name: '其他',
							list: [ '影视原声', '榜单', '经典', '翻唱', '游戏', '网络歌曲', 'KTV', '性感', '世界音乐']
						}
					]
				}
			],
			nowTagList: [{name: '全部', list: ['全部']}]
		}
	},

	components: {
		ddSheetList, ddSheetHot
	},

	mounted() {
		this.getSheet('sheet_boutique', {limit: 50, cat: '全部'}, (data) => {
			this.sheetList_china = data.body.playlists
		})
		
		this.getSheet('sheet_advise', {limit: 50}, (data) => {
			this.sheetList_hot = data.body.result
		})
	},

	methods: {
		async getSheet(funname, param, callback) { // 获取歌单
	    let {data} = await http.get({
	      api: apis[funname],
	      param
	    }) || ''
	    callback(data)
		},

		findThis(item) { // 点击一级tag
			this.nowTagList = item.catList
			this.aname = item.catList[0].name
		},

		selet(item) { // 点击二级tag
			this.chooseTag = item
			this.getSheet('sheet_boutique', {limit: 20, cat: item}, (data) => {
				this.sheetList_china = data.body.playlists
			})
		},

		godetail(item) { // 跳转页面
			this.$router.push({
				path: '/music_songList',
				query: {
					sheetId: item.id
				}
			})
		}
	}
}
</script>

<style scoped="scoped" lang="less">
@import url("../styles/index.less");
	.sheet_page{
		overflow-y: auto;
		height: 100%;
	}
	.sheet_tag{
		margin-right: .2rem;
		padding: 0 .2rem;
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		border-bottom: 1px solid hsla(0, 0%, 100%, .4);
		.tag_title{
			padding: .1rem .2rem;
			cursor:pointer;
		}
		.tag_title:hover{
			background: @bg_color_hover;
		}
		.active{
			background: @bg_color_hover;
		}
	}
	.tag_detail{
		display: flex;
		flex-flow: row wrap;
		align-items: center;
		padding: .2rem .3rem;
		.item_tag{
			cursor:pointer;
			margin: .1rem;
			padding: .06rem .2rem;
			border: 1px solid hsla(0, 0%, 100%, .4);
		}
		.acyive{
			border: 1px solid hsla(0, 0%, 100%, 1);
			color: @text_color_active;
		}
	}
</style>