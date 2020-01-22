/*
* 获取音乐歌词
* @param：必选参数 : id : 歌曲 id
* 调用例子 : /music/lyric?id=33894312
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      id: ctx.query.id
    };
    let result = await request(
      'POST', `https://music.163.com/weapi/song/lyric?lv=-1&kv=-1&tv=-1`, data,
      {crypto: 'linuxapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(result)
  })
};