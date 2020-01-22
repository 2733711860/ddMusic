/*
* 相似音乐
* @param：必选参数 : id: 歌曲 id
* 调用例子 : /music/similar?id=347230
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        songid: ctx.query.id,
        limit: ctx.query.limit || 50,
        offset: ctx.query.offset || 0
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/v1/discovery/simiSong`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};