var koa = require('koa')
var router = require('koa-router')
var views = require('co-views')

var render = views(__dirname + '/views',  { ext: 'ejs'})

var app = koa()

app.use(router(app))

app.get('/', index)
app.get('/about', about)

function *index() {
  this.body = yield render('index', {})
}

function *about() {
  console.log('Koa Context (this) has these properties: ');
  console.log(Object.keys(this));
  this.body = "<h2>This is the about route</h2>";
}

app.listen(3000)
