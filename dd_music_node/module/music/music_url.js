/*
* 获取音乐url
* @param：必选参数 : id : 歌曲 id
* @param：可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
* 调用例子 : /music/url?id=33894312
* */

const crypto = require('crypto');

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    // if(!('MUSIC_U' in ctx.query.cookie)) ctx.query.cookie._ntes_nuid = crypto.randomBytes(16).toString('hex')
    // ctx.query.cookie.os = 'pc'
    const data = {
      ids: '[' + ctx.query.id + ']',
      br: parseInt(ctx.query.br || 999000)
    };
    let result = await request(
      'POST', `https://music.163.com/api/song/enhance/player/url`, data,
      {crypto: 'linuxapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};