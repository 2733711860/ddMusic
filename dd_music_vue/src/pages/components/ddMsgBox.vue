<template>
	<div>
		<div :class="[{msg_box_show: showLogin}, 'msg_box']">
			<div class="msg_box_title">登陆</div>
			<input type="text" class="msg_box_inp" v-model="phone" placeholder="请输入手机号" />
			<input type="text" class="msg_box_inp" v-model="passw" placeholder="请输入密码" />
			<div class="login_btn" @click="loginn()">登陆</div>
		</div>
		<div class="msg_box_bg" v-show="showLogin" @click="closeLogin"></div>
	</div>
</template>

<script>
import http from '@/api/http'
import apis from '@/api'
import { mapGetters, mapActions } from 'vuex'
export default {
	props: {
		showLogin: ''
	},

	data () {
		return{
			phone: '',
			passw: ''
		}
	},

	methods: {
		closeLogin() {
			this.$emit('closeLogin')
		},

		async loginn() {
			let param = {
	  		phone: this.phone,
	  		password: this.passw
	  	}
	    let {data} = await http.get({
	      api: apis.login_cellphone,
	      param: param
	    }) || ''
	    this.closeLogin()
	    if(data.body.code == 200) {
	    	let userId = data.body.account.id
	    	this.setUid(userId)
	    	if (this.$router.path != '/music_user') {
	    		this.$router.push({
		    		path: '/music_user'
		    	})
	    	}
	    } else {
	    	alert('登录失败')
	    }
		},

		...mapActions(['setUid'])
	}
}
</script>

<style scoped="scoped" lang="less">
@import url("../../styles/index.less");
	.msg_box{
		z-index: 10;
		margin: auto;
		width: 0;
		height: 0;
		opacity: 0;
		border-radius: 8px;
		background-color: @dd_bg_mode_05;
		text-align: center;
		transition: all .2s;
	}
	.msg_box_show{
		width: 420px;
		height: 250px;
		opacity: 1;
	}
	.msg_box_bg{
		z-index: 3;
		background: @dd_bg_mask;
	}
	.msg_box_bg, .msg_box{
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
	}
	.msg_box_title{
		font-size: @font_size_18;
		padding: 4% 0;
	}
	.msg_box_inp{
		width: 80%;
		height: 15%;
		margin: 3.5% 0;
		padding: 0 3%;
		color: @text_color_09;
		border: 1px solid hsla(0,0%,100%,.6);
		outline: none;
		background: @dd_bg_mode_05;
	}
	.login_btn{
		border: 1px solid hsla(0,0%,100%,.4);
		width: 15%;
		height: 10%;
		margin-right: 7%;
		margin-top: 2%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		float: right;
		cursor: pointer;
	}
</style>