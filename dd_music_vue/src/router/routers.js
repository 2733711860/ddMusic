export default [
  {
    path: '/',
    redirect: '/music'
  },
  {
    path: '/music',
    component: resolve => { require(['@/pages/music.vue'], resolve) },
    redirect: '/music_listPage',
    children: [
	    {
	      path: '/music_listPage',
	      name: 'music_listPage',
	      component: resolve => {
		      require(['@/pages/music_listPage.vue'], resolve)
		    },
		    meta: {
		    	title: 'ddPlayer',
		    	showTop: true,
		    	showLyric: true
		    }
	    },
	    {
	      path: '/music_sheet',
	      name: 'music_sheet',
	      component: resolve => {
		      require(['@/pages/music_sheet.vue'], resolve)
		    },
		    meta: {
		    	title: '歌单',
		    	showTop: true,
		    	showLyric: true
		    }
	    },
	    {
	      path: '/music_user',
	      name: 'music_user',
	      component: resolve => {
		      require(['@/pages/music_user.vue'], resolve)
		    },
		    meta: {
		    	title: '用户中心',
		    	showTop: true,
		    	showLyric: true
		    }
	    },
	    {
	      path: '/music_songList',
	      name: 'music_songList',
	      component: resolve => {
		      require(['@/pages/music_songList.vue'], resolve)
		    },
		    meta: {
		    	title: '歌曲列表',
		    	showTop: true,
		    	showLyric: true
		    }
	    },
	    {
	      path: '/music_history',
	      name: 'music_history',
	      component: resolve => {
		      require(['@/pages/music_history.vue'], resolve)
		    },
		    meta: {
		    	title: '播放历史',
		    	showTop: true,
		    	showLyric: true
		    }
	    },
	    {
	      path: '/music_search',
	      name: 'music_search',
	      component: resolve => {
		      require(['@/pages/music_search.vue'], resolve)
		    },
		    meta: {
		    	title: '搜索',
		    	showTop: true,
		    	showLyric: true
		    }
	    },{
	      path: '/music_like',
	      name: 'music_like',
	      component: resolve => {
		      require(['@/pages/music_like.vue'], resolve)
		    },
		    meta: {
		    	title: '我的收藏',
		    	showTop: true,
		    	showLyric: true
		    }
	    },{
	      path: '/music_rank',
	      name: 'music_rank',
	      component: resolve => {
		      require(['@/pages/music_rank.vue'], resolve)
		    },
		    meta: {
		    	title: '排行榜单',
		    	showTop: true,
		    	showLyric: true
		    }
	    }
    ]
  }
]
