/*
* 获取歌手列表
* @param：categoryCode：歌手类型，必输项默认 1001，返回华语男歌手数据
* @param：limit：返回数量， 默认为 30
* @param：offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30
* @param：initial: 按首字母索引查找参数
* 调用例子：/singer/list?categoryCode=1001&initial=b
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        categoryCode: ctx.query.categoryCode || '1001',
        initial: isNaN(ctx.query.initial) ? (ctx.query.initial || '').toUpperCase().charCodeAt() || undefined : ctx.query.initial,
        offset: ctx.query.offset || 0,
        limit: ctx.query.limit || 30,
        total: true
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/artist/list`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};