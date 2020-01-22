/*
* 手机密码登陆
* @param：phone：手机号，必输项
* @param：password：密码，必输项
* @param：countrycode：国家码，必输项
* 调用例子：/login/cellphone?phone=xxx&password=yyy
* */

const crypto = require('crypto');

module.exports = async (ctx, request) => {
  return new Promise(async (resolve, reject) => {
    const data = {
      phone: ctx.query.phone,
      countrycode: ctx.query.countrycode,
      password: crypto.createHash('md5').update(ctx.query.password).digest('hex'),
      rememberLogin: 'true'
    }
    let results = await request(
      'POST', `https://music.163.com/weapi/login/cellphone`, data,
      {crypto: 'weapi', ua: 'pc', cookie: ctx.request.header.cookie, proxy: ctx.app.proxy}
    );
    resolve(results);
  })
};