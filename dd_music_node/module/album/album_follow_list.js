/*
* 已收藏专辑列表
* @param：limit: 取出数量 , 默认为 25
* @param：offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
* 调用例子 : /album/follow/list
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        limit: ctx.query.limit || 25,
        offset: ctx.query.offset || 0,
        total: true
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/album/sublist`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};