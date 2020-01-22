/*
* 获取专辑内容
* @param：必选参数 : id: 专辑 id
* 调用例子：/album/detail?id=32311
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await request(
        'POST', `https://music.163.com/weapi/v1/album/${ctx.query.id}`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};
