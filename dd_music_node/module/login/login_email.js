/*
* 邮箱登陆
* @param：email：邮箱账号：必输项
* @param：password：密码：必输项
* 调用例子 : /login/email?email=xxx@163.com&password=yyy
* */

const crypto = require('crypto');

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        email: ctx.query.email,
        password: crypto.createHash('md5').update(ctx.query.password).digest('hex'),
        rememberLogin: 'true'
      };
      console.log(data)
      let results = await request(
        'POST', `https://music.163.com/weapi/login`, data,
        {crypto: 'weapi', ua: 'pc', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
      );
      resolve(results);
    } catch (e) {
      resolve(e)
    }
  })
};