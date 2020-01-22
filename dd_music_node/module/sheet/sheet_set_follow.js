/*
* 收藏和取消收藏歌单
* @param：t : 类型,1:收藏,2:取消收藏
* @param：sheetId : 歌单 id
* 调用例子：/sheet/set/follow?sheetId=3094696617&t=2
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = (ctx.query.t == 1 ? 'subscribe' : 'unsubscribe')
      const data = {
        id: ctx.query.sheetId
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/${ctx.query.t}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};
