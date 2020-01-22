/*
* 获取相似歌手
* @param：必选参数 : id: 歌手 id
* 调用例子 : /singer/similar?id=6452
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        artistid: ctx.query.id,
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/discovery/simiArtist`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};