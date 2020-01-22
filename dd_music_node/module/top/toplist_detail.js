// 所有榜单内容摘要,排行榜列表

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    let result = await request(
      'POST', `https://music.163.com/weapi/toplist/detail`, {},
      {crypto: 'linuxapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  });
};