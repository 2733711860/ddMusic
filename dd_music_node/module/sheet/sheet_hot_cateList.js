/*
* 热门歌单分类
* 调用例子 : /sheet/hot/cateList
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/hottags`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};