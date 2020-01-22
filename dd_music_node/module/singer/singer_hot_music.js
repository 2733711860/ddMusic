/*
* 获取当前歌手热门50首歌曲
* @param：artistId : 歌手 id
* 调用例子 : /singer/hot/music?artistId=5771
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        id: ctx.query.artistId
      };
      let results = await request(
        'POST', `https://music.163.com/api/artist/top/song`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};