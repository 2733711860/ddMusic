/*
* 获取歌手描述
* @param：必选参数 : id: 歌手 id
* 调用例子 : /singer/desc?id=6452
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        id: ctx.query.id,
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/artist/introduction`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};