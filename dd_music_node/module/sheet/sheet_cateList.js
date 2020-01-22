/*
* 获取歌单分类
* @param：
* 调用例子 : /sheet/catelist
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/catalogue`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};