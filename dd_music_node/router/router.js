const router = require('koa-router')();
const fs = require('fs');
const path = require('path');
const request = require('../util/request');

let base_path = path.join(__dirname, '../module');
requireRouters(base_path);

function requireRouters(base_path) {
  let files = fs.readdirSync(base_path);
  files.forEach(file => {
    let file_name = base_path + '/' + file; // 完整文件名
    if (fs.statSync(file_name).isFile() && path.extname(file_name)==='.js') {
      let route = '/' + file.replace(/\.js$/i, '').replace(/_/g, '/');
      let question = require(file_name);
      router.get(route, async (ctx) => {
        console.log(ctx.query);
        let result = await question(ctx, request);
        ctx.body = result
      });
    } else {
      requireRouters(file_name)
    }
  })
}

module.exports = router;