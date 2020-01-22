/*
* 获取用户详情
* @param：uid：用户id
* 调用例子 : /user/detail?uid=291140161
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let results = await request(
        'POST', `https://music.163.com/weapi/v1/user/detail/${ctx.query.uid}`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      resolve(e)
    }
  })
};