<template>
	<div>
		<div class="headtop">
			<div class="left" @click="showTop=true">
				<img src="../../../static/img/play_mode.png" title="菜单" />
			</div>
			<div class="title">ddPlayer音乐播放器</div>
			<div class="user" @click="login()" title="登陆" v-if="uid==null">登陆</div>
			<div class="user" :title="`用户${uid}`" v-if="uid!=null">
				<span @click="showUser=!showUser">用户{{uid}}</span>
				<div :class="[{islogin: showUser}, 'user_action']">
					<div title="用户中心" @click="goUser">用户中心</div>
					<div title="退出登录" @click="logout">退出登录</div>
				</div>
			</div>
		</div>
		<dd-top :showTop="showTop" @closeTop="closeTop"></dd-top>
		<dd-msg-box :showLogin="showLogin" @closeLogin="closeLogin"></dd-msg-box>
	</div>
</template>

<script>
import ddTop from './ddTop.vue'
import ddMsgBox from './ddMsgBox.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
	data() {
		return {
			showTop: false, // 是否显示顶部隐藏的组件
			showLogin: false, // 是否显示登陆组件
			showUser: false
		}
	},

	components: {
		ddTop, ddMsgBox
	},

	computed: {
		...mapGetters(['uid'])
	},

	methods: {
		login() {
			this.showLogin = true
		},

		closeTop() {
			this.showTop = false
		},

		closeLogin() {
			this.showLogin = false
		},

		goUser() {
			this.showUser = false
			if (this.$route.path != '/music_user') {
				this.$router.push({
					path: '/music_user'
				})
			}
		},

		logout() {
			this.showUser = false
			if (this.$route.path != '/music_listPage') {
				this.$router.push({
					path: '/music_listPage'
				})
			}
			this.setUid(null)
		},

		...mapActions(['setUid'])
	}
}
</script>

<style scoped="scoped" lang="less">
	@import url("../../styles/index.less");
	.headtop{
		padding: .4rem;
		display: flex;
		justify-content: space-between;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		.title{
			font-size: @font_size_18;
			color: inherit;
		}
		.user{
			color: @text_color_06;
			cursor: pointer;
			position: relative;
			.user_action{
				width: 100%;
				height: 0;
				opacity: 0;
				text-align: center;
				position: absolute;
				background: @dd_bg_mask;
				transition: all .2s;
				div{
					height: .6rem;
					line-height: .6rem;
				}
				div:hover{
					background: @bg_color_hover;
				}
				div:nth-child(2){
					border-top: 1px solid hsla(0, 0%, 100%, 0.1);
				}
			}
			.islogin{
				height: 1.2rem;
				opacity: 1;
			}
		}
	}

	.left{
		img{
			width: .5rem;
			height: .5rem;
			cursor: pointer;
		}
	}
</style>