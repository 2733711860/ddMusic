<template>
  <div class="list-page">
    <div class="list_top">
      <div class="list_index"></div>
      <div class="list_song">歌曲</div>
      <div class="list_singer">歌手</div>
      <div class="list_time">时长</div>
    </div>
    <div class="list_all" ref="listContent" @scroll="listScroll($event)">
      <div
        class="list_item"
        v-for="(item, index) in list"
        @click="play(item, index)"
      >
        <div class="list_index">{{index + 1}}</div>
        <div class="list_song">
          <div class="play_name ell">
            {{item.name}}
            <div class="loading" v-show="currentMusic.id == item.id">
              <dd-loading></dd-loading>
            </div>
          </div>
          <div class="play_icon">
            <img src="../../../static/img/play.png" title="播放/暂停" @click="playThis(item, index)" />
            <img
              :src="likeList.filter(one => one.id==item.id).length>0 ? '../../../static/img/likeing.png' : '../../../static/img/love.png'"
              title="是否喜欢"
              v-if="uid!=null"
              @click="likeIt(item, index)"
            />
            <img
              src="../../../static/img/delete.png"
              title="删除"
              @click="deletOne(index)"
              v-show="$route.name=='music_history'"
            />
          </div>
        </div>
        <div class="list_singer ell">{{item.singer}}</div>
        <div class="list_time">{{ (item.duration % 3600) | format }}</div>
      </div>
      <div
        v-show="$route.name=='music_history' && list.length>0"
        class="cleaall"
        @click="clearAll"
      >清空播放历史</div>
      <div v-if="list.length==0" class="nomsg">没有歌曲信息</div>
    </div>
  </div>
</template>

<script>
import { format } from "@/utils/util";
import ddLoading from "./ddLoading.vue";
import { formatLikeSongs } from "@/utils/song";
import { mapGetters, mapMutations, mapActions } from "vuex";
import http from "@/api/http";
import apis from "@/api";
export default {
  components: {
    ddLoading
  },
  props: {
    list: ""
  },
  data() {
    return {
		lockUp: true, // 是否锁定滚动加载事件,默认锁定
		clickCount:0,
		clickedTime: {
			'timeA':"",
			'timeB':""
		}
    };
  },
  filters: {
    format
  },
  computed: {
    ...mapGetters(["currentMusic", "uid", "likeList"])
  },

  watch: {
    list(newList, oldList) {
      this.$refs.listContent.scrollTop = 0;
      if (newList.length !== oldList.length) {
        this.lockUp = false;
      } else if (
        newList[newList.length - 1].id !== oldList[oldList.length - 1].id
      ) {
        this.lockUp = false;
      }
    },

    likeList(newLike) {}
  },

  activated() {
    this.scrollTop &&
      this.$refs.listContent &&
      (this.$refs.listContent.scrollTop = this.scrollTop);
  },

  methods: {
    // 滚动事件
    listScroll(e) {
      const scrollTop = e.target.scrollTop;
      this.scrollTop = scrollTop;
      if (this.lockUp) {
        return;
      }
      const { scrollHeight, offsetHeight } = e.target;
      if (scrollTop + offsetHeight >= scrollHeight - 50) {
        this.lockUp = true; // 锁定滚动加载
        this.$emit("pullUp"); // 触发滚动加载事件
      }
    },

    async playThis(music, index) {
      // 选择播放
      if (this.$route.path == "/music_listPage") {
        // 正在播放列表页面
        if (music.id !== this.currentMusic.id) {
          this.setCurrentIndex(index);
          this.setPlaying(true);
        }
      } else {
        // 重新设置播放列表
        let image = await this._getMusicDetail(music.id);
        music.image = image;
        if (this.$route.path == "/music_search") {
          // 播放搜索到的歌曲先获取图片
        }
        this.selectPlay({
          list: this.list,
          index
        });
      }
	},
	
	async play(music, index) {
		this.clickCount++;
		if(this.clickCount==1){
			this.clickedTime.timeA=new Date();
		} else if(this.clickCount==2){
			this.clickedTime.timeB=new Date();
			if (Math.abs(this.clickedTime.timeA - this.clickedTime.timeB)<400){
				//  双击 function
				this.playThis(music, index)
			}
			this.clickCount=0;
		}
	},

    async _getMusicDetail(musicId) {
      // 获取音乐详情，返回音乐图片
      return new Promise(async resolve => {
        let param = { ids: musicId };
        let { data } =
          (await http.get({
            api: apis.music_detail,
            param: param
          })) || "";
        resolve(data.body.songs[0].al.picUrl);
      });
    },

    deletOne(index) {
      // 选择删除
      let list = [...this.list];
      list.splice(index, 1);
      this.removeHistory(list);
    },

    clearAll() {
      // 清空历史记录
      this.clearHistory();
    },

    async likeIt(item, index) {
      // 喜欢与取消喜欢
      let param = {
        id: item.id,
        name: item.name,
        singer: item.singer,
        album: item.album,
        image: item.image,
        duration: item.duration,
        url: item.url,
        like: true,
        uid: this.uid
      };
      let { data } =
        (await http.get({
          api: apis.like_music,
          param: param
        })) || "";
      if (data.status == 200) {
        this.searchLike();
      }
    },

    async searchLike() {
      let param = { uid: this.uid };
      let { data } =
        (await http.get({
          api: apis.like_search,
          param
        })) || "";
      let listt = await formatLikeSongs(data.data);
      this.setLikeList(listt);
    },

    ...mapMutations({
      setPlaying: "SET_PLAYING",
      setCurrentIndex: "SET_CURRENTINDEX"
    }),

    ...mapActions([
      "selectPlay",
      "clearHistory",
      "removeHistory",
      "setLikeList"
    ])
  }
};
</script>

<style scoped="scoped" lang="less">
@import url("../../styles/index.less");
.list-page {
  height: 100%;
  display: flex;
  flex-flow: column;
  .list_top {
    height: 1rem;
    line-height: 1rem;
    padding-left: 0.2rem;
    display: flex;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  }
  .list_all {
    flex: 1;
    overflow-y: auto;
    .list_item {
      height: 1rem;
      padding-left: 0.2rem;
      display: flex;
      align-items: center;
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    }
    .list_item:hover {
      color: @text_color_09;
      background-color: @bg_color_hover;
      .play_icon {
        opacity: 1;
      }
    }
  }
}
.list_index {
  width: 9%;
}
.list_song {
  width: 50%;
  display: flex;
  .play_name {
    flex: 1;
    // display: flex;
    .loading {
      height: auto;
      width: 0.5rem;
      margin-left: 0.2rem;
    }
  }
  .play_icon {
    margin-right: 0.4rem;
    opacity: 0;
    img {
      width: 0.3rem;
      height: 0.3rem;
      margin-right: 0.2rem;
      cursor: pointer;
    }
  }
}
.list_singer {
  width: 30%;
}
.list_time {
  width: 10%;
}
.cleaall,
.nomsg {
  padding: 0.2rem 0;
  text-align: center;
  border-top: 1px solid hsla(0, 0%, 100%, 0.1);
}
.cleaall {
  cursor: pointer;
}
.cleaall:hover {
  color: @text_color_active;
}
</style>