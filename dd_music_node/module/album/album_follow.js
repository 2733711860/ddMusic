/*
* 收藏和取消收藏专辑
* @param：id : 专辑 id
* @param：t : 1 为收藏,其他为取消收藏
* 调用例子 : /album/follow?t=1&id=32311
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = (ctx.query.t == 1 ? 'sub' : 'unsub');
      const data = {
        id: ctx.query.id
      };
      let result = await request(
        'POST', `https://music.163.com/api/album/${ctx.query.t}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};