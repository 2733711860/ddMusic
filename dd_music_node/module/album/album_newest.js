/*
* 最新专辑
* 调用例子 : /album/newest
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await request(
        'POST', `https://music.163.com/api/discovery/newAlbum`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};