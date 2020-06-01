// 所有榜单

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    let result = await request(
      'POST', `https://music.163.com/weapi/toplist`, {},
      {crypto: 'linuxapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  });
};