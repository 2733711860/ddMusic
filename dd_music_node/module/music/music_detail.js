// 歌曲详情：传入音乐 id(支持多个 id, 用 , 隔开)。如：/music/detail?ids=347230,347231

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    ctx.query.ids = ctx.query.ids.split(/\s*,\s*/)
    const data = {
      ids: '[' + ctx.query.ids.join(',') + ']',
      c: '[' + ctx.query.ids.map(id => ('{"id":' + id + '}')).join(',') + ']',
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/v3/song/detail`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};