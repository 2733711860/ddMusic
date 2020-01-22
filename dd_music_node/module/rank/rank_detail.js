/*
* 获取所有榜单内容摘要
* 调用例子：/rank/detail
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let results = await request(
        'POST', `https://music.163.com/weapi/toplist/detail`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};

