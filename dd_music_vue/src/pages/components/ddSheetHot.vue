<template>
	<div>
		<div>
			<div class="cat_name">{{name}}</div>
			<div class="sheet" v-if="list.length>0">
				<div v-for="(item, index) in list" class="sheet_item" :title="item.name" @click="godetail(item)">
					<img :src="item.picUrl" />
					<div class="item_name">{{item.name}}</div>
				</div>
			</div>
			<div v-else style="text-align: center;margin-top: 1rem;">
				没有歌单信息！
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		list: {
      type: Array,
      default: () => []
    },
		name: ''
	},

	methods: {
		godetail(item) {
			this.$emit('godetail', item)
		}
	}
}
</script>

<style scoped="scoped" lang="less">
@import url("../../styles/index.less");
  .cat_name{
  	padding: .2rem 0;
  	font-size: @font_size_18;
  	color: @text_color_09;
  }
	.sheet{
		display: flex;
		flex-flow: row wrap;
		.sheet_item{
			margin: .2rem;
			cursor:pointer;
			img{
				width: 2rem;
				height: 2rem;
				border-radius: .1rem;
			}
			.item_name{
				width: 2rem;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
</style>