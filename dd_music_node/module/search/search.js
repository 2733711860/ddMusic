// 搜索

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      s: ctx.query.keywords, // 关键词
      type: ctx.query.type || 1, // 搜索类型 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
      limit: ctx.query.limit || 30, // 返回数量
      offset: ctx.query.offset || 0 // 偏移数量
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/search/get`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};