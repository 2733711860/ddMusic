/*
* 新歌速递
* @param：type：地区类型 id。全部:0，华语:7，欧美:96，日本:8，韩国:16
* 调用例子：/music/new?type=7&limit=2&offset=0
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        areaId: ctx.query.type || 0, // 全部:0 华语:7 欧美:96 日本:8 韩国:16
        // limit: ctx.query.limit || 100,
        // offset: ctx.query.offset || 0,
        total: true
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/v1/discovery/new/songs`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};