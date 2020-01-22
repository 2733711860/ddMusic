/*
* 关注与取消关注用户
* @param：id : 要关注的用户 id
* @param：t : 1为关注,其他为取消关注
* 调用例子 : /user/set/follow?id=291140161&t=1
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.t = (ctx.query.t == 1 ? 'follow' : 'delfollow');
      let results = await request(
        'POST', `https://music.163.com/weapi/user/${ctx.query.t}/${ctx.query.id}`, {},
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};