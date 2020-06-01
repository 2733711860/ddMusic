const Koa = require('koa');
const app = new Koa();
const request = require('./util/request');

const koabodyparser = require('koa-bodyparser');
app.use(koabodyparser());

const cors = require('koa2-cors');
app.use(cors({
  origin: function(ctx) { //设置允许来自指定域名请求
    // return 'http://localhost:8083'; //只允许http://localhost:8080这个域名的请求
    return '*'
  },
  credentials: true, //是否允许发送Cookie
}));

const router = require('./router/router');
app.use(router.routes());
app.use(router.allowedMethods());

const { listenPort, listenHost } = require('./config');
app.listen(listenPort, listenHost, () => {
  console.log(`http://${listenHost}:${listenPort}`)
});


