var koa = require('koa')
    ,session = require('koa-session')
    ,mount = require('koa-mount')
    ,serve = require('koa-static')
    ,accesslog = require('koa-accesslog')
    ,koaqs = require('koa-qs')
    ,router = require('koa-router')();
var Grant = require('grant-koa')
    ,grant = new Grant(require('./config/oauth.json'));
var path = require('path');
var routes = require('./routes');
    
    
var distPath = path.join(__dirname,'../..',"dist");
console.log(distPath);

var app = koa();

routes(router);

app.use(accesslog());
app.keys = ['grant'];
app.use(serve(distPath));
app.use(session(app));
app.use(mount(grant));
app.use(router.routes());
koaqs(app);

app.listen(3000);
console.log('listening on port 3000');