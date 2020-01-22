/*
* 评论点赞
* @param：必选参数 : id : 资源 id, 如歌曲 id,mv id
* @param：cid : 评论 id
* @param：t : 是否点赞 ,1 为点赞 ,0 为取消点赞
* @param：tpye: 数字 , 资源类型。0: 歌曲，1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频，6: 动态
* 调用例子：/comment/like?id=29178366&cid=12840183&t=1&type=0
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = (ctx.query.t == 1 ? 'like' : 'unlike');
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
        threadId: ctx.query.type + ctx.query.id,
        commentId: ctx.query.cid
      };
      if(ctx.query.type == 'A_EV_2_'){
        data.threadId = ctx.query.threadId
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/v1/comment/${ctx.query.t}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};
