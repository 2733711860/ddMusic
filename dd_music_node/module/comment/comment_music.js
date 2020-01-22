/*
* 获取歌曲评论
* @param：必选参数 : id : 歌曲 id
* @param：可选参数 : limit: 取出评论数量 , 默认为 20
* @param：可选参数 : offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @param：可选参数 : before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
* 调用例子 : /music/lyric?id=33894312
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      id: ctx.query.id,
      limit: ctx.query.limit || 20,
      offset: ctx.query.offset || 0,
      beforeTime: ctx.query.before || 0
    };
    let result = await request(
      'POST', `https://music.163.com/api/v1/resource/comments/R_SO_4_${ctx.query.id}`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};