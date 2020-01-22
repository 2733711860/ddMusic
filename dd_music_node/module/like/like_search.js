/*
* 查询我的喜欢
*
* */
const { findData } = require('../../mysql/mysql');

module.exports = async (ctx) => {
  return new Promise(async (resolve, reject) => {
    try {
      let searchSql = `select * from music where uid = ${ctx.query.uid}`;
      let list = await findData(searchSql);
      let result = {
        status: 200,
        data: list,
        msg: "查询成功"
      };
      resolve(result)
    } catch (e) {
      let result = {
        status: 500,
        data: e,
        msg: "出错啦"
      };
      resolve(result)
    }
  })
};