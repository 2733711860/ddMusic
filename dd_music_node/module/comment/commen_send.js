/*
* 发送或回复或删除评论（删除只需要传前三个参数）
* @param：t:1 发送, 2 回复, 0 删除
* @param：tpye: 数字,资源类型。0: 歌曲，1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频，6: 动态
* @param：id:对应资源 id。如给动态发送评论，则不需要传 id，需要传动态的 threadId
* @param：content :要发送的内容
* @param：commentId :回复的评论id (回复评论时必填)
* 调用例子 : /comment/send?t=1&type=1&id=5436712&content=测试评论
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = {
        1: 'add',
        0: 'delete',
        2: 'reply'
      }[ctx.query.t];
      ctx.query.type = {
        0: 'R_SO_4_', //  歌曲
        1: 'R_MV_5_', //  MV
        2: 'A_PL_0_', //  歌单
        3: 'R_AL_3_', //  专辑
        4: 'A_DJ_1_', //  电台,
        5: 'R_VI_62_', //  视频
        6: 'A_EV_2_'  //  动态
      }[ctx.query.type];
      const data = {
        threadId: ctx.query.type + ctx.query.id
      };
      if(ctx.query.type == 'A_EV_2_'){
        data.threadId = ctx.query.threadId
      }
      if(ctx.query.t == 'add')
        data.content = ctx.query.content;
      else if(ctx.query.t == 'delete')
        data.commentId = ctx.query.commentId;
      else if (ctx.query.t == 'reply') {
        data.commentId = ctx.query.commentId;
        data.content = ctx.query.content
      }
      let result = await request(
        'POST', `https://music.163.com/weapi/resource/comments/${ctx.query.t}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};