/*
* 新建歌单（目测不可用，返回作弊）
* @param：必选参数 : sheetName : 歌单名
* @param：可选参数 : privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
* 调用例子 : /sheet/create?sheetName=测试歌单
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        name: ctx.query.sheetName,
        privacy: ctx.query.privacy || 0    //0 为普通歌单，10 为隐私歌单
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/create`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};