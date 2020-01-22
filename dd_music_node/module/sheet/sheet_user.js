// 获取用户歌单

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      uid: ctx.query.uid, // 用户id
      limit: ctx.query.limit || 30,
      offset: ctx.query.offset || 0
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/user/playlist`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};