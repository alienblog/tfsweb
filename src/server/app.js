var koa = require('koa')
    ,session = require('koa-generic-session')
    ,redisStore = require('koa-redis')
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
app.keys = ['grant','keys', 'keykeys'];
app.use(serve(distPath));
app.use(session({
    store: redisStore({
    // Options specified here
  })
}));
app.use(mount(grant));
app.use(router.routes());
koaqs(app);

app.listen(3000);
console.log('listening on port 3000');