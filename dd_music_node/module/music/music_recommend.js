/*
* 每日推荐歌曲( 需要登录 )
* 调用例子 : /sheet/recommend
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        total: true
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/v1/discovery/recommend/songs`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};