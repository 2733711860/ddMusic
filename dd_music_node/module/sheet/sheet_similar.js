/*
* 相似歌单推荐
* @param：必选参数 : sheetId : 歌单 id
* 调用例子 : /sheet/similar?sheetId=3094696617
* */

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await request(
        'GET', `https://music.163.com/playlist?id=${ctx.query.sheetId}`, {},
        {ua: 'pc', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      ).then(response => {
        try{
          const pattern = /<div class="cver u-cover u-cover-3">[\s\S]*?<img src="([^"]+)">[\s\S]*?<a class="sname f-fs1 s-fc0" href="([^"]+)"[^>]*>([^<]+?)<\/a>[\s\S]*?<a class="nm nm f-thide s-fc3" href="([^"]+)"[^>]*>([^<]+?)<\/a>/g;
          let result, playlists = [];
          while((result = pattern.exec(response.body)) != null){
            playlists.push({
              creator: {
                userId: result[4].slice('/user/home?id='.length),
                nickname: result[5]
              },
              coverImgUrl: result[1].slice(0, -('?param=50y50'.length)),
              name: result[3],
              id: result[2].slice('/playlist?id='.length)
            })
          }
          response.body = {code: 200, playlists: playlists};
          return response
        }
        catch(err){
          response.status = 500;
          response.body = {code: 500, msg: err.stack};
          return response
        }
      });
      resolve(result)
    } catch (e) {
      console.log(e);
      resolve(e)
    }
  })
};