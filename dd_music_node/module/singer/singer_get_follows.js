/*
* 获取收藏的歌手列表
* @param：limit：数量
* @param：offset：偏移数量
* 调用例子：/singer/get/follows
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
        'POST', `https://music.163.com/weapi/artist/sublist`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};