// 热搜

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      type: 1111 // 不知道是啥
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/search/hot`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};