// 推荐歌单

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      limit: ctx.query.limit || 30,
      // offset: ctx.query.offset || 0,
      total: true,
      n: 1000
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/personalized/playlist`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};