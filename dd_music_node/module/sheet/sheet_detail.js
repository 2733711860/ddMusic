// 歌单详情

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      id: ctx.query.id,
      n: 100000,
      s: ctx.query.s || 8
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/v3/playlist/detail`, data,
      {crypto: 'linuxapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};