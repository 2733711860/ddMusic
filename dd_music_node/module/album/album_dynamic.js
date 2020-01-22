/*
* 获取专辑动态信息，如是否收藏,收藏数,评论数,分享数
* @param：必选参数 : id: 专辑 id
* 调用例子：/album/dynamic?id=32311
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        id: ctx.query.id
      };
      let result = await request(
        'POST', `https://music.163.com/api/album/detail/dynamic`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};
