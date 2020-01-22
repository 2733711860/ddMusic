/*
* 歌手榜
* 调用例子 : /rank/singer
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        type: 1,
        limit: 100,
        offset: 0,
        total: true
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/toplist/artist`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};