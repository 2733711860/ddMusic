/*
* 对歌单添加或删除歌曲（需要登录，操作自己的歌单）
* @param：op: 从歌单增加单曲为 add, 删除为 del
* @param：pid: 歌单 id
* @param：musicId： 歌曲 id,可多个,用逗号隔开
* 调用例子：/sheet/set/song?op=add&pid=24381616&musicId=347231
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        op: ctx.query.op, // del,add
        pid: ctx.query.pid, // 歌单id
        trackIds: '[' + ctx.query.musicId + ']' // 歌曲id
      };
      let result = await request(
        'POST', `https://music.163.com/weapi/playlist/manipulate/tracks`, data,
        {crypto: 'weapi', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};