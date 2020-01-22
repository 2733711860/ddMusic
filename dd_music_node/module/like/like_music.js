/*
* 喜欢与取消喜欢（自己数据库）
*
*
* */

const { addData, findData, deleData } = require('../../mysql/mysql');

module.exports = async (ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = {
        id: ctx.query.id,
        name: ctx.query.name,
        singer: ctx.query.singer,
        album: ctx.query.album,
        image: ctx.query.image,
        duration: ctx.query.duration,
        url: ctx.query.url,
        like: ctx.query.like == 'true' ? 1 : 0, // 1代表喜欢，0代表不喜欢
        uid: ctx.query.uid
      };

      let searchSql = `select * from music where id = ${data.id}`;
      let list = await findData(searchSql);
      if (list.length > 0) { // 取消喜欢
        let deleteSql = `delete from music where id = ${data.id}`;
        let res = await deleData(deleteSql);
        console.log(res);
        let result = {
          status: 200,
          data: res,
          msg: '取消喜欢成功！'
        };
        resolve(result)
      } else { // 进行喜欢
        let insertSql = `insert into music set ?`;
        await addData(insertSql, data).then(data => {
          let result = {
            status: 200,
            data,
            msg: '喜欢成功！'
          };
          resolve(result)
        }, (err) => {
          console.log(err);
          let result = {
            status: 500,
            data: err,
            msg: "出错啦"
          };
          resolve(result)
        });
      }
    } catch (e) {
      let result = {
        status: 500,
        data: e,
        msg: "出错啦"
      };
      resolve(result)
    }
  });
};