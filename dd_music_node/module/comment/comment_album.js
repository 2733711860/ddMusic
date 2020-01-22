/*
* 专辑评论
* @param：必选参数 : albumId: 专辑 id
* @param：可选参数 : limit: 取出评论数量 , 默认为 20
* @param：offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
* @param：before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
* 调用例子 : /comment/album?albumId=32311
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        rid: ctx.query.albumId,
        limit: ctx.query.limit || 20,
        offset: ctx.query.offset || 0,
        beforeTime: ctx.query.before || 0
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/v1/resource/comments/R_AL_3_${ctx.query.albumId}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};