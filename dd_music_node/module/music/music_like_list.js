/*
* 喜欢音乐列表,可获取已喜欢音乐id列表(id数组)
* @param：必选参数 : uid: 用户 id
* 调用例子 : /music/like/list?uid=291140161
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      uid: ctx.query.uid
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/song/like/get`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};
