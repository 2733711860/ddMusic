/*
* 收藏与取消收藏歌手
* @param：artistId : 歌手 id，必选参数
* @param：t:操作,1 为收藏,其他为取消收藏
* 调用例子：/singer/set/follow?artistId=5771&t=1
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = (ctx.query.t == 1 ? 'sub' : 'unsub');
      const data = {
        artistId: ctx.query.artistId,
        artistIds: '[' + ctx.query.artistId + ']'
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/artist/${ctx.query.t}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};