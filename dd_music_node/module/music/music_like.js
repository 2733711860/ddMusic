/*
* 喜欢、取消喜欢音乐
* @param：必选参数 : id: 歌曲 id
* @param：可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
* 调用例子 : /music/like?id=347230&like=true
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      ctx.query.like = ctx.query.like == 'false' ? false : true
      const data = {
        trackId: ctx.query.id,
        like: ctx.query.like
      };
      let results = await request(
        'POST', `https://music.163.com/weapi/radio/like?alg=${ctx.query.alg ||
        'itembased'}&trackId=${ctx.query.id}&time=${ctx.query.time ||
        25}`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};