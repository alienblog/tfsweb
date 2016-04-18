var koa = require('koa')
    ,session = require('koa-session')
    ,mount = require('koa-mount')
    ,serve = require('koa-serve');
var Grant = require('grant-koa')
    ,grant = new Grant(require('./config/oauth.json'));
var path = require('path');
    
    
var app = koa();

app.keys = ['grant'];
app.use(serve("",path.join(__dirname,'..','dist')));
app.use(session(app));
app.use(mount(grant));

app.listen(3000);