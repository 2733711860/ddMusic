/*
* 判断歌曲是否可用1416387774
* @param：必选参数 : id : 歌曲 id
* @param：可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
* 调用例子 : /music/check?id=33894312
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      ids: '[' + parseInt(ctx.query.id) + ']',
      br: parseInt(ctx.query.br || 999000)
    };
    let results = await request(
      'POST', `https://music.163.com/weapi/song/enhance/player/url`, data,
      {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    let result = {};
    result.status = results.status;
    if (results.status == 200) {
      result = results
    } else {
      result.msg = '该歌曲暂无版权~~~'
    }
    resolve(result)
  })
};