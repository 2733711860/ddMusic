/*
* 获取歌手专辑
* @param：必选参数 : id: 歌手 id
* @param：可选参数 : limit: 取出数量 , 默认为 50
* @param：offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
* 调用例子 : /singer/album?id=6452&limit=30
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        limit: ctx.query.limit || 30,
        offset: ctx.query.offset || 0,
        total: true
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/artist/albums/${ctx.query.id}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};