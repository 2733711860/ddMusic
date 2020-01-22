/*
* 获取用户关注列表
* @param：uid：用户id，必输项
* @param：offset：偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
* @param：limit：返回数量 , 默认为 30
* 调用例子：/user/follows?uid=291140161
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        offset: ctx.query.offset || 0,
        limit: ctx.query.limit || 30,
        order: true
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/user/getfollows/${ctx.query.uid}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};